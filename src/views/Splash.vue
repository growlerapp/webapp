<template>
  <div class="Splash">
    <div class="Splash-body">
      <div class="Splash-bg"></div>

      <div class="Splash-content">
        <!-- Si usuario ingresa por primera vez -->
        <template v-if="!hasUserJoinedToApp">
          <div class="Splash-step">
            <h2>Bienvenido a</h2>
            <img class="Splash-logo" src="/img/img-logo-white.svg" alt="GrowlerApp">
          </div>

          <div class="Splash-step">
            <h2>
              Encuentra los bares <br>
              más cercanos para <br>
              llenar tu <br>
            </h2>
            <h3>Growler</h3>
          </div>

          <div class="Splash-step">
            <div class="Splash-loading">
              <loading type="relative" color="white" />
            </div>
            <h2>Obteniendo tu ubicación...</h2>

            <template v-if="isGeoError !== null">
              <template v-if="isGeoError === 0">
                <h3>Debes autorizar la geolocalización en tu dispositivo para continuar</h3>
              </template>
              <template v-else-if="isGeoError === 1">
                <h3>No podemos detectar donde te encuentras</h3>
              </template>
              <template v-else>
                <h3>Ha ocurrido un error tratando de obtener tu geolocalización</h3>
              </template>
              <div class="Splash-continue">
                <v-button @click.native="forceReload" type="alt">Reintentar</v-button>
              </div>
            </template>
          </div>
        </template>

        <!-- Si usuario ya ha ingresado previamente -->
        <template v-else>
          <div class="Splash-loading">
            <loading type="relative" color="white" />
          </div>
          <h2>Buscando lugares cercanos...</h2>
        </template>
      </div>

      <img class="Splash-growler" src="/img/img-growler-cut-white.svg" alt="growler">
    </div>
  </div>
</template>

<script>
import { checkHasJoined, setUserHasJoined, checkUserGeoData, getUserData } from '@/user'
import Loading from '@/components/Loading'
import vButton from '@/components/v-Button'

export default {
  name: 'Splash',

  components: {
    Loading,
    vButton
  },

  data: () => ({
    isGeoError: null,
    hasUserJoinedToApp: false
  }),

  async mounted () {
    try {
      if (checkHasJoined() && checkUserGeoData()) {
        // setea flag de inicio
        this.hasUserJoinedToApp = true
        // redirije al home
        await this.goToHome()
      } else {
        // iniciar animaciones
        await this.playSteps()
        // obtener geo data
        await getUserData()
        this.$store.dispatch('userGeoData', { force: true })
        // setea flag de inicio
        setUserHasJoined()
        // redirecciona al home
        await this.goToHome()
      }
    } catch (error) {
      this.isGeoError = error.code
    }
  },

  methods: {
    delay (time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },

    async playSteps () {
      const step = document.getElementsByClassName('Splash-step')
      await this.delay(400)
      step[0].classList.add('is-active')
      await this.delay(2800)
      step[0].classList.remove('is-active')
      step[1].classList.add('is-active')
      await this.delay(2000)
      step[1].classList.remove('is-active')
      step[2].classList.add('is-active')
    },

    forceReload () {
      window.location.reload(true)
    },

    async goToHome () {
      await this.delay(2000)
      this.$router.push('home')
    }
  }
}
</script>

<style scoped>
.Splash {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.Splash-loading {
  display: flex;
  justify-content: center;
}

.Splash .is-loading {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.Splash-bg {
  position: absolute;
  height: 100vh;
  width: 100%;
  opacity: 0.5;
  background-image: url(/img/bgr-dirt.svg);
  background-size: 300px;
}

.Splash-body {
  text-align: center;
  display: grid;
  justify-items: center;
  align-content: center;
  height: 100vh;
  background-color: var(--color-red);
  color: var(--color-white);
}

.Splash-content {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.Splash-logo {
  width: 160px;
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
  opacity: 0.8;
  opacity: 0;
  margin: 0 auto;
  transform: translateY(20px);
  animation: anim-fade 1s .6s ease forwards;
  max-height: 36%;
}

.Splash h1 {
  font-size: 4rem;
}

.Splash h2 {
  font-size: 1.4rem;
  font-family: var(--font-family-normal);
  font-weight: lighter;
}

.Splash h3 {
  font-size: 1.2rem;
  font-family: var(--font-family-primary);
  text-transform: uppercase;
  margin-top: 10px;
  line-height: 1.4;
  letter-spacing: 1px;
}

.Splash-content i {
  font-size: 3rem;
}

.Splash-step {
  visibility: hidden;
  opacity: 0;
  transform: translateY(-20px);
  transition: all .8s ease;
  position: absolute;
  left: 40px;
  right: 40px;
  bottom: 0;
}

.Splash-step:nth-child(2) {
  bottom: -30px;
}

.Splash-step:nth-child(2) h2 {
  margin-bottom: 0;
}

.Splash-step.is-active {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

@keyframes anim-fade {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
