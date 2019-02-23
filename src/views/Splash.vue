<template>
  <div class="Splash" :class="{'is-loading': loading}">
    <!-- <img class="Splash-growler" src="/img/img-growler.svg" alt="GrowlerApp"> -->
    <div class="Splash-body">
      <div class="Splash-loading">
        <loading type="relative"/>
      </div>

      <h2>Bienvenido a</h2>

      <img class="Splash-logo" src="/img/img-logo.svg" alt="GrowlerApp">

      <div class="Splash-continue">
        <router-link to="home">
          <v-button>Comenzar</v-button>
        </router-link>
      </div>

      <!-- <div class="Splash-loading" :class="{'is-loading': loading}">
        <h2>Obteniendo tu ubicación...</h2>
        <h2 v-show="isGeoError">Debes dar permisos para localizar tu bar más cercano.</h2>
      </div>-->
    </div>
  </div>
</template>

<script>
import user from '@/user'
import Loading from '@/components/Loading'
import vButton from '@/components/v-Button'

export default {
  name: 'Splash',

  components: {
    Loading,
    vButton
  },

  data: () => ({
    loading: true,
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
}

.Splash-loading {
  /* opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(-10px); */
  margin-top: -60px;
}

.Splash .is-loading {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.Splash-body {
  padding: 20px;
  text-align: center;
  position: relative;
  height: calc(100vh - 100px);
  display: grid;
  justify-items: center;
  align-content: center;
}

.Splash-logo {
  max-width: 110px;
  margin-top: 10px;
}

.Splash-continue {
  margin-top: 20px;
}

.Splash-growler {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
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
