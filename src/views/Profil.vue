<template>
  <div>
    <v-alert
      :value="notif"
      color="#1A237E"
      dark
      dismissible
      border="top"
      transition="scale-transition"
      width="200px"
    >
      Mot de passe enregistré</v-alert
    >
    <div class="header">
      <div class="header-bonjour">{{ user }}</div>
      <div class="header-consignes">
        Changer votre mot de passe (veuillez ecrire au moins 7 lettres):
      </div>
      <div class="header-password">
        <ul class="list-group">
          <li class="list-group-item">
            Nouveau mot de passe:
            <input v-model="password" type="password" class="form-control" />
          </li>
          <li class="list-group-item">
            Confirmer le nouveau mot de passe:
            <input v-model="confirm" type="password" class="form-control" />
          </li>
          <li class="list-group-item error" v-if="error"> Mot de passe incorrect ou vide</li>
          <li class="list-group-item">
            <button class="btn btn-group btn-primary" @click="modify">
              Enregistrer
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import login from '../services/login'
export default {
  data () {
    return {
      password: '',
      confirm: '',
      notif: false,
      error: false
    }
  },
  computed: {
    user () {
      if (this.$store.getters.getUser.user !== undefined) {
        return 'Bonjour ' + this.$store.getters.getUser.user.name
      } else return 'Bonjour ' + this.$store.getters.getUser.name
    }
  },
  methods: {
    modify () {
      if (this.password !== '' && this.password.length > 7 && this.password === this.confirm) {
        this.error = false
        login.modifyPassword(this.password).then(async () => {
          this.notif = true
          setTimeout(() => {
            this.notif = false
          }, 3000)
          await this.$store.dispatch('setConnected', false)
          await this.$store.dispatch('logoutUser')
          this.$router.push('/')
        })
      } else {
        this.error = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
*{
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

.list-group {
  margin-top: 5rem;
  width: 50%;
  text-align: left;
  &-item {
    border: none;
  }
  .form-control {
    margin-top: 1rem;
    margin-bottom: 1px solid black !important;
  }
}
.error{
 border: solid 2px red;
 color: red;
}
</style>
