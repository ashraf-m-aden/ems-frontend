<template>
  <div class="express">
    <div class="express-body">
      <div class="express-body-header">
        <div class="left">
          <div>
            <label class="block">Bureau d'origine</label>
            <input type="text" />
          </div>
          <div class="left-bottom">
            <div>
              <label class="block">Bureau d'origine</label>
              <input type="text" />
            </div>
            <div>
              <label class="block">Bureau d'origine</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div class="right">
          <label class="block">Bureau d'origine</label>
          <input type="text" />
        </div>
      </div>
      <div class="express-body-body">
          <div class="sender"></div>
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
.block {
  display: block;
}
.express {
  &-body {
    min-width: 100%;
    &-header {
      min-width: 100%;
      display: flex;
      flex-direction: row;
      .left-bottom{
          display: flex;
          width: 100%;
          div{
              width: 50%;
          }
      }
      .left,
      .right {
        width: 50% !important;
        border: 1px solid black;
      }
    }
  }
}
</style>
