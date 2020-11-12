<template>
  <div class="lettres">
    <div class="header">
      <v-alert
        :value="notif"
        color="#1A237E"
        dark
        dismissible
        border="top"
        transition="scale-transition"
        width="200px"
      >
        Colis enregistré</v-alert
      >
      <div class="dropdown dropleft">
        <img
          src="../../assets/mort_vert.png"
          class="menu dropdown-toggle"
          alt=""
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <span class="dropdown-item btn" @click="saveLettre">Enregistrer</span>
        </div>
      </div>
    </div>
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
              <td>
                <label class="form-check-label mr-2" for="gridRadios1"
                  >Regime interieur</label
                ><input
                  @change="getZone"
                  value="Regime interieur"
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                />
              </td>
              <td>
                <label class="form-check-label mr-2" for="gridRadios2"
                  >Regime international</label
                ><input
                  @change="getZone"
                  value="Regime international"
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                />
              </td>
              <td>
                <label class="form-check-label mr-2" for="gridRadios3"
                  >Petit paquet</label
                ><input
                  @change="getZone"
                  value="Petit paquet"
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                />
              </td>
            </tr>
            <td colspan="3" class="border-none">
              <select
                class="form-control"
                v-model="to.zone"
                v-if="
                  to.type === 'Petit paquet' ||
                    to.type === 'Regime international'
                "
              >
                <option value="Zone 1">Zone 1 </option>
                <option value="Zone 2">Zone 2 </option>
                <option value="Zone 3">Zone 3 </option>
              </select>
              <select
                class="form-control"
                v-model="to.zone"
                v-if="to.type === 'Regime interieur'"
              >
                <option value="Djibouti-ville">Djibouti-ville </option>
                <option value="District">District </option>
              </select>
            </td>
          </table>

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
                <span class="error">{{ message }}</span>
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
        type: '',
        zone: '',
        weight: '',
        date: '',
        price: '',
        idNumber: ''
      },
      zones: [],
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
    go () {
      this.$router.push('/')
    },
    getPrice () {
      const zone = this.to.zone
      this.message = ''
      try {
        var weight = this.getWeight(parseInt(this.to.weight), this.to.type)
        if (
          zone !== '' &&
          weight !== null &&
          weight !== undefined &&
          weight !== 0
        ) {
          this.zones.forEach(z => {
            if (parseInt(z.weight) === weight && z.zone === zone) {
              this.to.price = z.price
            }
          })
        } else {
          this.message =
            "Pas assez d'informations, ou mauvais poids enregistré."
          this.to.price = undefined
        }
      } catch (error) {}
    },
    getZone (event) {
      const type = event.target.value
      this.to.weight = undefined
      this.to.price = ''
      this.message = ''
      this.to.type = type
      price.getlettreZone({ type }).then(zones => {
        this.zones = zones.data
      })
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
    },
    getWeight (weight, type) {
      let result = 0
      if (type === 'Regime interieur' || type === 'Regime international') {
        if (weight > 0 && weight <= 20) {
          result = 20
        } else if (weight > 20 && weight <= 50) result = 50
        else if (weight > 50 && weight <= 100) result = 100
        else if (weight > 100 && weight <= 250) result = 250
        else if (weight > 250 && weight <= 500) result = 500
        else if (weight > 500 && weight <= 1000) result = 1000
        else if (weight > 1000 && weight <= 1500) result = 1500
        else if (weight > 1500 && weight <= 2000) result = 2000
        else result = null
      } else {
        if (weight > 0 && weight <= 0.5) result = 0.5
        else if (weight > 0.5 && weight <= 1) result = 1
        else if (weight > 1 && weight <= 1.5) result = 1.5
        else if (weight > 1.5 && weight <= 2) result = 2
        else result = null
      }
      return result
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
.header {
  position: relative;
  padding-top: 2rem;
  .code {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
  }
  .dropdown {
    position: absolute;
    right: 0;
    .menu {
      height: 25px;
    }
  }
}
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
.error {
  color: red;
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
