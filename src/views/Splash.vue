<template>
  <div class="Splash">
    <div class="Splash-body">
      <img class="Splash-logo" src="/img/img-growler-ga.svg" alt="GrowlerApp">
      <div class="Splash-loading" :class="{'is-loading': loading}">
        <h2>Obteniendo tu ubicación...</h2>
        <h2 v-show="isGeoError">Debes dar permisos para localizar tu bar más cercano.</h2>
      </div>
      <loading type="top"/>
    </div>
  </div>
</template>

<script>
import user from '@/user'
import Loading from '@/components/Loading'

export default {
  name: 'Splash',

  components: {
    Loading
  },

  data: () => ({
    loading: false,
    isGeoError: false
  }),

  mounted () {
    setTimeout(async () => {
      this.loading = true
      this.getData()
    }, 600)
  },

  methods: {
    async getData () {
      await user.getUserGeo()
      this.$router.push('home')
    }
  }
}
</script>

<style scoped>
.Splash {
  height: 100vh;
  background: #2c332d;
  color: #fff;
}

.Splash-loading {
  opacity: 0;
  visibility: hidden;
  transition: all .3s ease;
  transform: translateY(-10px);
}

.Splash .is-loading {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.Splash-body {
  padding: 20px;
  text-align: center;
  height: calc(100vh - 100px);
  display: grid;
  align-content: center;
  text-align: center;
}

.Splash-logo {
  max-height: 50vh;
  margin: 0 auto;
}

.Splash h1 {
  font-size: 4rem;
}

.Splash h2 {
  font-size: 1rem;
  font-family: var(--font-family-normal);
  font-weight: lighter;
}
</style>
