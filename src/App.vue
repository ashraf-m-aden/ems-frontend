<template>
  <div id="app">
    <HEADER></HEADER>
    <router-view />
  </div>
</template>
<script>
import login from './services/login'
import HEADER from './components/header'
export default {
  components: {
    HEADER
  },
  mounted () {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      this.$store.dispatch('setConnected', true)
      login.getUser(localStorage.getItem('id')).then(async (user) => {
        await this.$store.dispatch('setUser', user.data)
        await this.$store.dispatch('setConnected', true)
        this.$router.push('/')
      })
    }
  }

}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
