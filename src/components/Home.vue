<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <div class="Home-body">
      <h2>Los bares más cercanos para llenar tu growler son:</h2>
    </div>
  </div>
</template>

<script>
import Onboarding from './Onboarding'

export default {
  name: 'Home',

  components: {
    Onboarding,
  },

  data: () => ({
    isFirstLaunch: false,
  }),

  methods: {}
}
</script>

<style>
.Home {
  text-align: center;
}

.Home h2 {
  color: var(--color-blue);
  font-size: 2rem;
}
</style>
