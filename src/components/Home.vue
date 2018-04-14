<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <div class="Home-body">
      <h2 class="Home-title">Los bares más cercanos para llenar tu growler son:</h2>

      <template v-for="(n, k) in 10">
        <StoreItem
          title="Bar El Growler"
          address="Los Robles #2143"
          distance="2 kms."
          :key="k"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Onboarding from './Onboarding'
import StoreItem from './StoreItem'

export default {
  name: 'Home',

  components: {
    Onboarding,
    StoreItem,
  },

  data: () => ({
    isFirstLaunch: false,
  }),

  methods: {}
}
</script>

<style>
.Home-title {
  color: var(--color-blue);
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
}
</style>
