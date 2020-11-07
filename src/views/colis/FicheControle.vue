<template>
  <div class="control">
        <span class="code">CP71</span>
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
    <div class="control-header">
      <div class="logo">
        <img src="../../assets/logo.png" class="logo_img" alt="" />
        <h4>La poste de Djibouti</h4>
      </div>
      <h2 class="title">FICHE DE CONTROLE</h2>
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
    </div>
    <div class="control-body">
      <div class="left">
        <div class="from">
          <span for="name">NOM:</span>
          <input
            v-model="from.name"
            @input="syncData"
            type="text"
            id="name"
          /><br />
          <span for="tel">TEL:</span>
          <input
            v-model="from.tel"
            @input="syncData"
            type="text"
            id="tel"
          /><br />
          <span for="code">Code Postale:</span>
          <input
            @input="syncData"
            v-model="from.cp"
            type="text"
            class="codeville"
          />
          <span for="ville">Ville:</span>
          <input
            @input="syncData"
            type="text"
            v-model="from.town"
            class="codeville"
          /><br />
          <strong>Djibouti</strong>
          <div class="douane">
            Reference douane de l'expediteur (si elle existe)
          </div>
        </div>
        <div class="to">
          <span for="nameTo">NOM:</span>
          <input
            @input="syncData"
            type="text"
            id="nameTo"
            v-model="to.name"
          /><br />
          <span for="address">ADDRESSE:</span>
          <input
            @input="syncData"
            type="text"
            id="address"
            v-model="to.address"
          /><br />
          <span for="tel2">TEL:</span>
          <input
            @input="syncData"
            type="text"
            v-model="to.tel"
            id="tel2"
          /><br />
          <span for="tel2">Code Postale:</span>
          <input
            @input="syncData"
            type="text"
            class="codeville"
            v-model="to.cp"
          />
          <span for="tel2">Ville:</span>
          <input
            @input="syncData"
            type="text"
            class="codeville"
            v-model="to.town"
          /><br />
          <span for="pays">Pays:</span>
          <select name="" id="" v-model="to.country">
            <option
              v-for="(country, index) in countries"
              :key="index"
              :value="country.name"
              >{{ country.name }}</option
            >
          </select>
        </div>
        <div class="infos">
          <div class="infos-details">
            <h5>Bureau d'échange</h5>
            <div id="box" class="box">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                @input="syncData"
                v-model="to.object"
              ></textarea>
            </div>
            <div class="valeur">
              <label for="">Valeur estimée</label>
              <input @input="syncData" type="text" v-model="to.value" /> FDJ
            </div>
          </div>
          <div class="infos-douane">
            <span>Timbre de la douane</span>
          </div>
        </div>
        <div class="declarations">
          <ul>
            <li>
              Declaration: J’ais reçu le colis décrit sur ce bulletin. <br />
              Date et signature du destinataire
            </li>
            <li class="price">
              <div style="width:50%">
                <span
                  >Je certifies que les renseignements donnés dans la pré-sente
                  déclaration en douane sont exacts et que cet envoi ne contient
                  aucun objet dangereux ou interdit par la législation ou la
                  réglementation postale ou douanière</span
                >
              </div>
              <div style="padding-left:2rem; cursor:pointer">
                <h4 @click="syncDate">Date et signature de l’expéditeur</h4> <br />
                <h4>{{to.date}}</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <ul>
          <li>
            <span>Valeur declarée en lettres </span
            ><input @input="syncData" type="text" class="triple" /> en chiffres
            <input @input="syncData" type="text" class="one" />
          </li>
          <li>
            <span>Montant du rembourssement</span
            ><input @input="syncData" type="text" class="triple" /> en chiffres
            <input @input="syncData" type="text" class="one" />
          </li>
          <li>
            <span>Compte courant postale centre des cheques </span
            ><input @input="syncData" type="text" class="triple" />
          </li>
          <li>
            <span
              >Réference de l'importateur (si elle existe)/( code
              fiscale/nodeTVA/code de l'importateur) (facultatif) </span
            ><input @input="syncData" type="text" class="triple" />
          </li>
          <li class="price">
            <div>
              <span>Poids brut total du colis</span>
              <input
                @input="getPrice"
                type="number"
                class="double"
                v-model="to.weight"
              />
              KG <br />
              <span style="color:red">{{ message }}</span>
            </div>
            <div>
              <span>Taxe </span>
              <input readonly type="text" class="triple" v-model="to.price" />
              FDJ
            </div>
          </li>
          <li>
            <h2>Instructions de l'expediteur en cas de non-livraison</h2>
            <table>
              <tr>
                <th></th>
                <th>Renvoyer/Reexpedier</th>
              </tr>
              <tr>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Renvoyer à l'expediteur apres</span
                  ><input @input="syncData" type="text" class="one" /> jours
                </td>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Par voie de surface</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Renvoyer à l'expediteur à l'addresse ci-dessous</span
                  ><input @input="syncData" type="text" class="triple" />
                </td>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Par avion</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Renvoyer immediatement à l'expediteur</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input @input="syncData" type="checkbox" />
                  <span>Traiter comme abondonné</span>
                </td>
              </tr>
            </table>
          </li>
        </ul>
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
        price: ''
      },
      message: '',
      notif: false
    }
  },
  mounted () {
    this.$store.dispatch('setCountry')
  },
  methods: {
    syncData () {
      this.$store.dispatch('setTo', this.to)
      this.$store.dispatch('setFrom', this.from)
    },
    getPrice () {
      var weight = this.to.weight.toString()
      weight = Math.ceil((parseFloat(this.to.weight)))
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
      var agent = this.$store.getters.getUser.name
      ems.postEms({ to: this.to, from: this.from, agent }).then(() => {
        this.notif = true
        setTimeout(() => {
          this.notif = false
        }, 2000)
      })
    },
    syncDate () {
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

<style lang="scss">
@import "../../sass/main.scss";

.control {
    position: relative;
    padding-top: 1rem;
  .code{
    position: absolute;
    top: 0;
    right: 0;
  }
  &-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    .logo {
      line-height: 0.1;

      &_img {
        width: 100px !important;
      }
    }
    .menu {
      height: 25px;
    }

    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &-body {
    height: auto;
    border: solid 1px $color-dark-grey;
    display: flex;

    .left,
    .right {
      width: 100%;
      border: solid 1px $color-dark-grey;
      text-align: left;
    }

    .left {
      .from {
        position: relative;
        border-bottom: solid 2px $color-dark-grey;
        padding: 2rem 1rem 2rem 1rem;

        input {
          border-bottom: solid 1px $color-dark-grey;
          width: 50%;
        }

        .codeville {
          width: 30%;
        }

        .douane {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 20%;
          border-left: solid 1px $color-dark-grey;
        }
      }

      .to {
        position: relative;
        border-bottom: solid 2px $color-dark-grey;
        padding: 2rem 1rem 2rem 1rem;

        input {
          border-bottom: solid 1px $color-dark-grey;
          width: 500px;

          &:focus {
            border-top: solid transparent !important;
            background: yellow;
          }
        }

        .codeville {
          width: 30%;
        }

        .douane {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 20%;
          border-left: solid 1px $color-dark-grey;
        }
      }

      .infos {
        display: flex;

        &-details {
          width: 80%;
          border-bottom: solid 1px $color-dark-grey;
          height: 150px;
          position: relative;

          .box {
            display: flex;
            flex-direction: column;
            height: 100px;
            width: 100%;
            textarea {
              margin-bottom: 1rem;
            }
          }

          .valeur {
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }

        &-douane {
          border-left: solid 1px $color-dark-grey;
          padding: 0 !important;
        }
      }
    }
  }
}

ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 1rem 0 1rem 0;
  &:not(:last-child) {
    border-bottom: solid 1px $color-dark-grey;
  }
}
.price {
  display: flex;
}
input {
  border: none;
  margin-bottom: 0.9rem;
}
.triple {
  width: 50%;
}
.double {
  width: 20%;
}
.one {
  width: 10%;
}
</style>
