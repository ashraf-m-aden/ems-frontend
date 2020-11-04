<template>
  <div class="control">
    <div class="control-header border-danger">
      <div class="logo">
        <img src="../../assets/logo.png" class="logo_img" alt="" />
        <h4>La poste de Djibouti</h4>
      </div>
      <h2 class="title">Bulletin d'expedition</h2>
    </div>
    <div class="control-body">
      <div class="left">
        <div class="from">
          <span for="name">NOM:</span>
          <input :value="from.name" readonly type="text"  /><br />
          <span for="tel">TEL:</span>
          <input :value="from.tel" readonly type="text"  /><br />
          <span for="code">Code Postale:</span>
          <input readonly :value="from.cp" type="text"  />
          <span for="ville">Ville:</span>
          <input readonly type="text" :value="from.town"  /><br />
          <strong>Djibouti</strong>
          <div class="douane">
            Reference douane de l'expediteur (si elle existe)
          </div>
        </div>
        <div class="to">
          <span for="nameTo">NOM:</span>
          <input readonly type="text"  :value="to.name"/><br />
          <span for="address">ADDRESSE:</span>
          <input readonly type="text"  :value="to.address"/><br />
          <span for="tel2">TEL:</span>
          <input readonly type="text" :value="to.tel" /><br />
          <span for="tel2">Code Postale:</span>
          <input readonly type="text" class="codeville" :value="to.cp"/>
          <span for="tel2">Ville:</span>
          <input readonly type="text" class="codeville" :value="to.town"/><br />
          <span for="pays">Pays:</span>
          <input readonly type="text"  :value="to.country"/><br />
        </div>
        <div class="info">
          <div class="info-details">
            <h5>Bureau d'échange</h5>
            <div id="box" class="box">
              <textarea name="" id="" cols="30" rows="5" readonly :value="to.object"></textarea>
            </div>
            <div class="valeur">
              <label for="">Valeur estimée</label>
              <input readonly type="text" :value="to.value"/> FDJ
            </div>
          </div>
          <div class="info-douane">
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
              <div>
                Date et signature de l’expéditeur <br />
                <input readonly type="text" class="triple" :value="to.date"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <ul>
          <li>
            <span>Valeur declarée en lettres </span
            ><input readonly type="text" class="triple" /> en chiffres
            <input readonly type="text" class="one" />
          </li>
          <li>
            <span>Montant du rembourssement</span
            ><input readonly type="text" class="triple" /> en chiffres
            <input readonly type="text" class="one" />
          </li>
          <li>
            <span>Compte courant postale centre des cheques </span
            ><input readonly type="text" class="triple" />
          </li>
          <li>
            <span
              >Réference de l'importateur (si elle existe)/( code
              fiscale/nodeTVA/code de l'importateur) (facultatif) </span
            ><input readonly type="text" class="triple" />
          </li>
          <li class="price">
            <div>
              <span>Poids brut total du colis</span>
              <input readonly type="number" class="double" :value="to.weight" /> KG
            </div>
            <div>
              <span>Taxe</span>
              <input readonly type="text" class="triple" :value="to.price" /> FDJ
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
                  <input readonly type="checkbox" />
                  <span>Renvoyer à l'expediteur apres</span
                  ><input readonly type="text" class="one" /> jours
                </td>
                <td>
                  <input readonly type="checkbox" />
                  <span>Par voie de surface</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input readonly type="checkbox" />
                  <span>Renvoyer à l'expediteur à l'addresse ci-dessous</span
                  ><input readonly type="text" class="triple" />
                </td>
                <td>
                  <input readonly type="checkbox" /> <span>Par avion</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input readonly type="checkbox" />
                  <span>Renvoyer immediatement à l'expediteur</span>
                </td>
              </tr>
              <tr>
                <td>
                  <input readonly type="checkbox" />
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
export default {

  computed: {
    to () {
      return this.$store.getters.getTo
    },
    from () {
      return this.$store.getters.getFrom
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../../sass/main.scss";

.control {
  &-header {
    position: relative;
    display: flex;
    justify-content: space-between;

    .logo {
      line-height: 0.1;

      &_img {
        width: 100px !important;
      }
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

        input readonly {
          border-bottom: solid 1px $color-dark-grey;
          width: 50%;
        }

        .codeville{
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

        input readonly {
          border-bottom: solid 1px $color-dark-grey;
          width: 500px;

          &:focus {
            border-top: solid transparent !important;
            background: yellow;
          }
        }

        .codeville{
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

      .info {
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
input readonly {
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
