<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <div class="Home-body" v-if="stores">
      <h2 class="Home-title">Los bares más cercanos para llenar tu growler son:</h2>

      <StoreItem
        v-for="item in stores"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :address="item.address"
      />
    </div>
  </div>
</template>

<script>
import Onboarding from './Onboarding'
import StoreItem from './StoreItem'
import STORES_ALL from '~/src/graphql/StoresAll.graphql'

export default {
  name: 'Home',

  components: {
    Onboarding,
    StoreItem,
  },

  data: () => ({
    isFirstLaunch: false,
    stores: null,
  }),

  apollo: {
    findAll: {
      query: STORES_ALL,
      update({ findAll }) {
        this.stores = findAll
      },
    },
  },
}
</script>

<style>
.Home-title {
  color: var(--color-black);
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
}

.Home-body > a {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>
