<template>
  <div class="Onboarding">
    <div class="Onboarding-body">
      <img class="Onboarding-hop" src="../assets/img/img-lupulo.svg" alt="hop">

      <h2>Bienvenido a</h2>
      <h1>Growler App</h1>
      <v-button>Comenzar</v-button>

      <!-- <h3>Obteniendo tu ubicación...</h3> -->

      <!-- <div class="Onboarding-growler">
        <img src="../assets/img/img-growler.svg" alt="growler">
      </div> -->
    </div>
  </div>
</template>

<script>
import vButton from '@/components/v-Button'

export default {
  name: 'Onboarding',

  components: {
    vButton
  },

  data: () => ({
    isFirstLaunch: false
  }),

  mounted () {},

  methods: {}
}
</script>

<style>
.Onboarding {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.Onboarding-hop {
  animation: anim-hop 4s ease infinite;
}

@keyframes anim-hop {
  100% {
    transform: rotate(360deg);
  }
}

.Onboarding h1 {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.Onboarding h2,
.Onboarding h3 {
  font-family: var(--font-family-normal);
  font-weight: normal;
}

.Onboarding-growler {
  position: absolute;
  bottom: 300px;
  justify-content: center;
}
</style>
