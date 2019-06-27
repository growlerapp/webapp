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
            <i class="ico-pin"></i>
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

            <template v-if="isGeoError">
              <h3>Debes autorizar la geolocalización para continuar</h3>
              <div class="Splash-continue">
                <v-button @click.native="forceReload" type="alt">Recargar</v-button>
              </div>
            </template>
          </div>
        </template>

        <!-- Si usuario ya ha ingresado previamente -->
        <template v-else>
          <div class="Splash-loading">
            <loading type="relative" color="white" />
          </div>
          <h2>Cargando datos...</h2>
        </template>
      </div>

      <img class="Splash-growler" src="/img/img-growler-cut-white.svg" alt="growler">
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
    isGeoError: false,
    hasUserJoinedToApp: false
  }),

  async mounted () {
    if (user.checkHasJoined()) {
      this.hasUserJoinedToApp = true
      this.goToHome()
    } else {
      // iniciar animaciones
      await this.playSteps()
      // obtener geo
      this.getData()
      // setear flag usuario primera vez
      user.setUserHasJoined()
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

    async getData () {
      try {
        await user.getUserData()
        this.goToHome()
      } catch (e) {
        this.isGeoError = true
      }
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
  max-height: 40%;
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
  bottom: -20px;
}

.Splash-step:nth-child(1) {
  bottom: 10px;
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
