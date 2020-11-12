<template>
<div>
    <!-- SOURCE -->
    <div id="printMe" >
<FICHE></FICHE>
<FICHETWO></FICHETWO>
<Recepisse></Recepisse>
<BULLETIN></BULLETIN>
    </div>
    <!-- OUTPUT -->
</div>
</template>

<script>
import FICHE from './FicheControle.vue'
import FICHETWO from './FicheControleTwo.vue'
import Recepisse from './Recepisse'
import BULLETIN from './BulletinExpedition'
export default {
  components: {
    FICHE,
    FICHETWO,
    BULLETIN,
    Recepisse
  },
  data () {
    return {
      output: null
    }
  },
  mounted () {
    this.$store.dispatch('setprint', true)
  },
  destroyed () {
    this.$store.dispatch('setprint', false)
  },
  methods: {
    go () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 1rem;
}
</style>
