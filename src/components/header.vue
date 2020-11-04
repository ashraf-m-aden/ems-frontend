<template >
    <div v-show="!print">
<v-app-bar
      color="#2A3B4D"
>
  <v-toolbar-title><router-link to="/" class="router">COLIPLUS</router-link></v-toolbar-title>

      <v-spacer></v-spacer>
<template>
  <v-row justify="space-around">
 <router-link to="/all-ems">
      <v-icon
      large
      color="#FAFAFA "
    >
      mdi-domain
    </v-icon>
 </router-link>

  </v-row>
</template></v-app-bar>    </div>
</template>
<script>
export default {
  computed: {
    print () {
      return this.$store.getters.getPrint
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.router{
  font-family: quick;
  text-decoration: none;
  color: $color-white;
  font-size: 3rem;
}
v-icon{
  color: white;
}
</style>
