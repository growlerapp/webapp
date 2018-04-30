<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <loading v-if="!stores"/>

    <div class="Home-body" v-if="stores">
      <h2 class="Home-title">Los bares más cercanos para llenar tu growler son:</h2>

      <StoreItem
        v-for="(item, k) in stores"
        :key="k"
        :id="k"
        :name="item.name"
        :address="item.address"
      />
    </div>
  </div>
</template>

<script>
import Onboarding from './Onboarding'
import StoreItem from './StoreItem'
import Loading from '~/src/components/Loading'
import STORES_ALL from '~/src/graphql/FindByProximity.graphql'

export default {
  name: 'Home',

  components: {
    Onboarding,
    StoreItem,
    Loading,
  },

  data: () => ({
    isFirstLaunch: false,
    stores: null,
  }),

  mounted() {
    this.findAll()
  },

  methods: {
    findAll() {
      this.$apollo.query({
        query: STORES_ALL,
        variables: {
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long,
        },
      }).then((result) => {
        this.stores = result.data.findByProximity
      }).catch(() => {
        // console.error(error)
      })
    }
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
