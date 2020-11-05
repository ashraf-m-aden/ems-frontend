<template>
<div class="wrapper">
  <span class="code">E1</span>
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
          <span class="dropdown-item btn" @click="saveEms">Enregistrer</span>
        </div>
      </div>
    <div class="express">
    <div class="express-body">
      <div class="express-body-header">
        <div class="left">
          <div class="border-bottom border-dark p-1">
            <label class="block">Bureau d'origine</label>
            <label class="block form-controll">La poste de DJibouti. Service EMS</label>
          </div>
          <div class="left-bottom">
            <div class="border-right border-dark p-1">
              <label class="block">Date de depot</label>
              <input class="form-control" type="text" />
            </div>
            <div class="p-1">
              <label class="block">Heure</label>
              <input class="form-control" type="text" />
            </div>
          </div>
        </div>
        <div class="right">
          <textarea name="" class="form-control" id="" cols="30" rows="2"></textarea>
        </div>
      </div>
      <div class="express-body-info">
        <div class="express-body-info-sender">
          <div class="header">
            <h3 class="header-text">EXPEDITEUR</h3>
          </div>
          <div class="sender-contact">
            <div class="border-right border-bottom border-dark p-1">
              <label class="block">Numero de contrat</label>
              <input v-model="from.contract" class="form-control" type="text" />
            </div>
            <div class=" border-bottom border-dark p-1">
              <label class="block">Numero de telephone</label>
              <input v-model="from.tel" class="form-control" type="text" />
            </div>
          </div>
          <div class="sender-info p-1">
            <label class="block">Nom de l'expediteur</label>
            <input v-model="from.name" type="text" class="form-control" />
            <label> Addresse</label>
            <input v-model="from.address" type="text" class="form-control" />
            <label> Ville</label> <input v-model="from.town" type="text" class="form-control" />
            <label> Code Postal</label>
            <input v-model="from.cp" type="text" class="form-control" /> <label>Pays</label>
            <h5>DJibouti</h5>
          </div>
          <div class="header">
            <h3 class="header-text">Declaration en douanes</h3>
          </div>
          <table>
            <tr>
              <td @click="from.isDoc = !from.isDoc">
                Document <br>
                     <v-icon v-if="from.isDoc"
      large
      color="#F4511E"
    >
      mdi-check
    </v-icon>
              </td>
              <td>
                Marchandise
              </td>
              <td colspan="2">
                Pour les marchandises priere de fournir la facture commerciale
                ou la facture proforma
              </td>
            </tr>
            <tr>
              <td>
                Description du contenu
              </td>
              <td>
                Nombre de pieces
              </td>
              <td>
                Poids en Kg
              </td>
              <td>
                Valeur declarée
              </td>
            </tr>
            <tr>
              <td><textarea :value="from.object" class="form-control" name="" id="" cols="20" rows="8"></textarea></td>
              <td><textarea :value="from.number" class="form-control" name="" id="" cols="20" rows="8"></textarea></td>
              <td><input :value="from.weight" type="number" class="form-control triple"></td>
              <td><textarea :value="from.value" class="form-control" name="" id="" cols="20" rows="8"></textarea></td>
            </tr>
            <tr>
              <td colspan="4">
                Signature de l'employé acceptant l'envoi
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p class="paragraph mb-3">
                  J'atteste l'exactitude des informations declarées ci-dessous
                  et que l'envoie ne contient pas d'objets dangereux ou
                  interdits
                </p>
                Signature de l'expediteur
              </td>
            </tr>
          </table>
        </div>
        <div class="express-body-info-receiver">
          <div class="header">
            <h3 class="header-text">EXPEDITEUR</h3>
          </div>
          <div class="receiver-contact">
            <div class="border-right border-bottom border-dark p-1">
              <label class="block">Numero de contrat</label>
              <input class="form-control" type="text" />
            </div>
            <div class=" border-bottom border-dark p-1">
              <label class="block">Numero de telephone</label>
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="receiver-info p-1">
            <label class="block">Nom et addresse de l'expediteur</label>
            <input type="text" class="form-control" />
            <label> Addresse</label>
            <input type="text" class="form-control" />
            <label> Ville</label> <input type="text" class="form-control" />
            <label> Code Postal</label>
            <input type="text" class="form-control" />
            <label>Pays/Zone</label>
            <div class="zone">
              <select name="" id="" class="form-control" v-model="to.country">
                <option v-for="(country,index) in countries" :key="index" :value="country.name">{{country.name}}</option>
              </select>
              <select name="" id="" class="form-control"></select>
            </div>
          </div>
          <table class="receiver-table">
            <tr>
              <td >Taxe d'expedition</td>
              <td>Droits d'assurance</td>
              <td>Droits de ramassage</td>
              <td>Montant total des taxes
                <h3>{{to.price}}</h3>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p class="mb-3">Nom en caractere d'imprimerie de la personne recevant l'envoi</p>
                Signature
              </td>
            </tr>
            <tr>
              <td colspan="2">Directives speciales</td>
              <td>Date de la remise</td>
              <td>Heure de la remise</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import price from '../../services/price'
import ems from '../../services/ems'
export default {
  data () {
    return {
      showMenu: false,

      from: {
        name: '',
        tel: '',
        cp: '',
        town: '',
        address: '',
        contract: '',
        isDoc: false,
        isMarchandise: false,
        object: '',
        number: '',
        weight: '',
        value: '',
        etiquette: ''
      },
      to: {
        name: '',
        address: '',
        tel: '',
        cp: '',
        town: '',
        country: '',
        price: ''
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
    syncData () {
      this.$store.dispatch('setTo', this.to)
      this.$store.dispatch('setFrom', this.from)
    },
    getPrice () {
      const weight = this.to.weight
      const country = this.to.country
      if (
        this.to.country !== '' &&
        this.to.weight !== null &&
        this.to.weight !== undefined &&
        this.to.weight !== 0
      ) {
        price.getPrice({ weight, country }).then(price => {
          this.to.price = price.data
          this.syncData()
          this.message = ''
        })
      } else {
        this.message = "Pas assez d'infosrmations pour afficher un prix"
      }
    },
    saveEms () {
      ems.postEms({ to: this.to, from: this.from }).then(() => {
        this.notif = true
        setTimeout(() => {
          this.notif = false
        }, 2000)
      })
    },
    syncDate () {
      this.to.date =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate()
      this.syncData()
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
.wrapper{
  position: relative;
  padding-top: 2rem;
  .code{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
  }
  .dropdown{
    position: absolute;
    right: 0;
        .menu {
      height: 25px;
    }
  }
}
.block{
  display: block;
}
tr {
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
}
td {
font-size: 0.8rem;
padding: 0rem 0rem 1rem 1rem;
  &:not(:last-child) {
    border-right: 1px solid black;
  }
}
.express {
  text-align: left;
  font-size: 1rem;
  font-family: quick;
  font-weight: 800;
  &-body {
    min-width: 100%;
    &-header {
      min-width: 100%;
      display: flex;
      flex-direction: row;
      .left-bottom {
        display: flex;
        width: 100%;
        div {
          width: 50%;
        }
      }
      .left,
      .right {
        width: 50% !important;
        border: 1px solid black;
      }
      .right{
        padding-top: 3rem;
      }
    }
    &-info {
      display: flex;
      min-width: 100%;
      &-sender {
        width: 50%;
        border: 1px solid black;
        .sender-contact {
          display: flex;
          div {
            width: 100%;
          }
        }
      }
      &-receiver {
        width: 50%;
        border: 1px solid black;
        .receiver-contact {
          display: flex;
          div {
            width: 100%;
          }
        }
        .receiver-table{
          width: 100%;
          border-top: 1px solid black;
          td{
            height: 11rem;
padding: 0rem 0rem 5rem 1rem !important;
          }
        }
      }
    }
  }
}
.form-controll {
  margin-bottom: 0.3rem;
  font-family: "Times New Roman", Times, serif;
  font-weight: 100;
  font-size: 1.2rem;
}

.form-control {
  border-bottom: 1px dashed;
  display: inline-block !important;
  margin-bottom: 0.3rem;
  font-family: "Times New Roman", Times, serif;
  font-weight: 100;
  font-size: 1.2rem;
}

.header {
  background: $color-primary;
  padding: .5rem;
  &-text {
    color: white;
    font-size: 1.2rem;
  }
}
.zone {
  display: flex;
  justify-content: space-between;
  select{
    width: 40%;
  }
}
</style>
