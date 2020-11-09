<template>
  <div class="dashboard">
    <div class="header">
      <div class="header-bonjour">
        {{ user }}
      </div>
      <div class="header-consignes">
        Les chiffres relatifs aux colis d'aujourd'hui.
      </div>
    </div>
    <div class="colis">
      <div class="colis-ems card">
        <div class="title">
          <img src="../assets/ems.jpg" width="50" alt="" />
        </div>
        <div class="number">
          <table>
            <tr class="">
              <td class="number-td">Nombre de colis envoyé:</td>
              <td class="number-td chiffre">{{ emsNumber }}</td>
            </tr>
            <tr class="">
              <td class="number-td">Chiffres d'affaires:</td>
              <td class="number-td chiffre">{{ emsPrice }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="colis-ems card">
        <div class="title">
          <img src="../assets/de.png" width="50" alt="" />
        </div>
        <div class="number">
          <table>
            <tr class="">
              <td class="number-td">Nombre de colis envoyé:</td>
              <td class="number-td chiffre">{{ expressNumber }}</td>
            </tr>
            <tr class="">
              <td class="number-td">Chiffres d'affaires:</td>
              <td class="number-td chiffre">{{ expressPrice }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ems from '../services/ems'
import express from '../services/express'
export default {
  data () {
    return {
      output: null,
      emsNumber: 0,
      emsPrice: 0,
      expressNumber: 0,
      expressPrice: 0,
      message: ''
    }
  },
  computed: {
    user () {
      var connected = this.$store.getters.getConnected
      if (this.$store.getters.getConnected && this.$store.getters.getUser.user !== undefined) {
        return 'Bonjour ' + this.$store.getters.getUser.user.name
      } else {
        connected = ''
        return 'Bonjour' + connected
      }
    }
  },
  mounted () {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      this.$store.dispatch('setConnected', true)
    }
    ems.getToday().then(ems => {
      this.emsNumber = ems.data.length
      ems.data.forEach(element => {
        this.emsPrice += parseInt(element.to.price)
      })
    })
    express.getToday().then(express => {
      this.expressNumber = express.data.length
      express.data.forEach(element => {
        this.expressPrice += parseInt(element.to.price)
      })
    })
  },
  methods: {
    goEMS () {
      this.$router.push('/colis-ems')
    },
    goExpress () {
      this.$router.push('/express')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.dashboard {
  font-family: quick;
}
.header {
  margin-top: 2rem;
  &-bonjour {
    font-family: quick;
    font-size: 2rem;
  }
  &-consignes {
    margin-top: 2rem;
    text-align: left;
    font-size: 1.5rem;
    font-family: quick;
  }
}
.colis {
  display: flex;
  margin-top: 2rem;
  justify-content: space-around;
  &-ems {
    width: 30%;
    .title {
      display: flex;
      font-family: quick;
    }
    .number {
      width: 100%;
      table {
        width: 100%;
      }
      &-td {
        list-style: none;
        padding: 1rem;
        text-align: left;
        font-size: 1.3rem;
        border: none;
      }
      .chiffre {
        font-size: 2rem;
      }
    }
  }
}
</style>
