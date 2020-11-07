<template>
  <div class="dashboard">
    <div class="card">
    </div>
    <div class="card">
      <v-img class="img" max-width="250" src="../assets/de.png"></v-img>
      <h2>Colis express</h2>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      output: null
    }
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
  display: flex;
  justify-content: space-around;
}
.card {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 10rem;
  width: 40%;
  border: 1px solid $color-secondary;
  border-radius: 20%;
  cursor: pointer;
  .img {
    margin: 0 auto;
    padding: 2rem;
  }
}
</style>
