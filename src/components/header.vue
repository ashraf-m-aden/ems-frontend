<template>
  <div v-show="!print">
    <v-app-bar color="#2A3B4D">
      <v-toolbar-title
        ><router-link to="/" class="router"
          >COLIPLUS</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <div class="work" v-show="connected">
        <router-link to="/colis-ems" class="work-btn">
          <button>
            EMS
            <v-icon right dark>
              mdi-package-variant
            </v-icon>
          </button>
        </router-link>
        <router-link to="/express" class="work-btn">
          <button>
            Express
            <v-icon right dark>
              mdi-rocket
            </v-icon>
          </button>
        </router-link>
        <router-link to="/" class="work-btn">
          <button class="work-btn">
            Lettres
            <v-icon color="#ffffff">
              mdi-email-outline
            </v-icon>
          </button>
        </router-link>
      </div>
      <v-spacer></v-spacer>
        <div class="d-flex justify-content-between menu">
          <router-link to="/all-ems" v-show="connected">
            <v-icon large color="#FAFAFA ">
              mdi-calendar
            </v-icon>
          </router-link>
          <router-link to="/statistiques" v-show="connected">
            <v-icon large color="#FAFAFA ">
              mdi-chart-line
            </v-icon>
          </router-link>
          <router-link to="/login" v-show="!connected">
            <v-icon large color="#FAFAFA "> mdi-login </v-icon>
          </router-link>
          <v-icon large color="#FAFAFA " v-show="connected" @click="logout">
            mdi-logout
          </v-icon>
        </div>
      </v-app-bar
    >
  </div>
</template>
<script>
import login from '../services/login'
export default {
  computed: {
    print () {
      return this.$store.getters.getPrint
    },
    connected () {
      return this.$store.getters.getConnected
    }
  },
  methods: {
    logout () {
      login
        .logout()
        .then(async () => {
          await this.$store.dispatch('logoutUser')
          await this.$store.dispatch('setConnected', false)

          console.log(this.$router)
        })
        .catch(() => {
          this.$store.dispatch('logoutUser')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.router {
  font-family: quick;
  text-decoration: none;
  color: $color-white;
  font-size: 3rem;
}
.work {
  display: flex;
  justify-content: space-around;
  width: 30%;

  &-btn {
    text-decoration: none;
    color: white !important;
  }
}
.menu {
  display: flex;
  justify-content: space-around;
  width: 10%;

  &-btn {
    text-decoration: none;
    color: white !important;
  }
}

v-icon {
  color: white;
}
</style>
