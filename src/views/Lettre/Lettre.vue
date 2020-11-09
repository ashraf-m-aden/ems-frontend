<template>
  <div class="lettres">
    <div class="lettres-info">
      <div class="from">
        <div class="title">Expediteur</div>
        <table>
          <tr>
            <td>
              Nom
            </td>
            <td>
              <input v-model="from.name" type="text" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>
              Tel
            </td>
            <td>
              <input v-model="from.tel" type="text" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>
              Code Postal
            </td>
            <td>
              <input v-model="from.cp" type="text" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>
              Ville
            </td>
            <td>
              <input v-model="from.twn" type="text" class="form-control" />
            </td>
          </tr>
        </table>
      </div>
      <div class="to">
        <div class="title">Destinataire</div>
        <table>
          <tr>
            <td>
              Nom
            </td>
            <td colspan="2">
              <input v-model="to.name" type="text" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>
              Addresse
            </td>
            <td colspan="2">
              <input v-model="to.address" type="text" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>
              Code Postal / Tel
            </td>
            <td>
              <input v-model="to.cp" type="text" class="form-control" />
            </td>
            <td>
              <input v-model="to.tel" type="text" class="form-control" />
            </td>
          </tr>

          <tr>
            <td>
              Pays/Ville
            </td>
            <td>
              <select name="" id="" class="form-control" v-model="to.country">
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="country.name"
                  >{{ country.name }}</option
                >
              </select>
            </td>
            <td>
              <input v-model="to.town" type="text" class="form-control" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="lettres-content">
      <div class="content">
        <div class="title">Contenu</div>
        <div class="list">
          <table>
            <tr>
              <td @click="putDate" class="date">Date</td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  readonly
                  :value="to.date"
                />
              </td>
            </tr>
          </table>

          <h5 class="mt-5">Contenu du colis</h5>
          <textarea
            v-model="to.object"
            class="coliscontent form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div class="prices">
        <div class="title">Details</div>
        <div class="list">
          <table>
            <tr>
              <td>Poids / Prix</td>
              <td>
                <input
                  v-model="to.weight"
                  type="number"
                  class="form-control"
                  @keypress.enter="getPrice"
                />
              </td>
              <td>
                <input
                  v-model="to.price"
                  type="text"
                  class="form-control"
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td>Numero de suivie</td>
              <td colspan="2">
                <input v-model="to.idNumber" type="text" class="form-control" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lettre from '../../services/lettre'
import price from '../../services/price'
export default {
  data () {
    return {
      from: {
        name: '',
        tel: '',
        cp: '',
        town: ''
      },
      to: {
        name: '',
        address: '',
        tel: '',
        cp: '',
        town: '',
        country: '',
        object: '',
        value: '',
        weight: '',
        date: '',
        price: '',
        idNumber: ''
      },
      message: '',
      notif: false
    }
  },
  mounted () {
    this.$store.dispatch('setCountry')
    this.$store.dispatch('setprint', true)
  },
  destroyed () {
    this.$store.dispatch('setprint', false)
  },
  methods: {
    getPrice () {
      const country = this.to.country
      var weight = this.to.weight
      try {
        weight = Math.ceil(parseFloat(this.to.weight))

        if (
          this.to.country !== '' &&
          this.to.weight !== null &&
          this.to.weight !== undefined &&
          this.to.weight !== 0
        ) {
          price.getlettrePrice({ weight, country }).then(price => {
            this.to.price = price.data
            this.message = ''
          })
        } else {
          this.message = "Pas assez d'informations pour afficher un prix"
        }
      } catch (error) {}
    },
    saveLettre () {
      lettre.postlettre({ to: this.to, from: this.from }).then(() => {
        lettre.updatelettreStats({ to: this.to, from: this.from }).then(() => {
          this.notif = true
          setTimeout(() => {
            this.notif = false
          }, 2000)
        })
      })
    },
    putDate () {
      if (new Date().getDate() < 10) {
        this.to.date =
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-0' +
          new Date().getDate()
      } else {
        this.to.date =
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate()
      }
    }
  },
  computed: {
    countries () {
      return this.$store.getters.getCountry
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../sass/main.scss";

.lettres {
  font-family: quick;
  width: 100%;
  &-info,
  &-content {
    width: 100%;
    display: flex;
  }
  &-info {
    .from,
    .to {
      width: 50%;
    }
  }
  &-content {
    .content,
    .prices {
      width: 50%;
    }
  }
}
table {
  width: 90%;
  border-top: solid 1px black;
  text-align: left;
  margin: 0 auto;
}

td {
  padding: 1rem 0 1rem 1rem;
  width: auto;
  border: solid 1px black;
}
.title {
  margin-top: 2rem;
  font-size: 2rem;
  margin-bottom: 3rem;
}
.form-control {
  border-bottom: 1px dashed;
  display: inline-block !important;
  margin-bottom: 0.3rem;
  font-family: "Times New Roman", Times, serif;
  font-weight: 100;
  font-size: 1.5rem;
}
.coliscontent {
  border: solid 1px $color-dark-grey;
  margin: 1rem 0 0 1rem;
}
.date {
  cursor: pointer;
}
</style>
