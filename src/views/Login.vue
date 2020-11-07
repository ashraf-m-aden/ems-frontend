<template>
  <div class="wrapper">
    <div class="login">
      <h2 class="login-title">COLIPLUS</h2>
      <div class="form">
        <label>Email</label>
        <input type="text" class="form-control" v-model="email" />
        <label>Mot de passe</label>
        <input
          type="text"
          class="form-control"
          v-model="mdp"
          @keypress.enter="login"
        />
        <label class="error" v-if="message">Mot de passe ou email erroné</label>
      </div>
    </div>
  </div>
</template>

<script>
import login from '../services/login'

export default {
  data () {
    return {
      email: '',
      mdp: ''
    }
  },
  methods: {
    login () {
      const data = { email: this.email, password: this.mdp }
      login.login(data).then(async (user) => {
        await this.$store.dispatch('setUser', user.data)
        await this.$store.dispatch('setConnected', true)
        this.$router.push('/')
      }).catch(() => {
        this.$store.dispatch('setError')
      })
    }
  },
  computed: {
    message () {
      return this.$store.getters.getError
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.wrapper {
  position: relative;
  height: 90vh;
  font-family: quick;

  .login {
    position: absolute;
    @include centerElement;
    width: 50%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    &-title {
      font-size: 4rem;
      background: #2a3b4d;
      color: white;
      font-family: quick;
      width: 100%;
      border-radius: 20px;
    }
    .form {
      margin-top: 5rem;
      font-size: 2rem;
      text-align: left;

      &-control {
        border-bottom-style: dashed;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }
  }
}
.error {
  color: $color-tertiary;
  font-size: 1rem;
  font-family: "Times New Roman", Times, serif;
  animation: moveInLeft 0.5s;
}
</style>
