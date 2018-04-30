<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <loading v-if="!stores"/>

    <div class="Home-body" v-if="stores">
      <pull-to :top-load-method="refresh" :top-config="pullBottomConfig">
        <h2 class="Home-title">Los bares más cercanos para llenar tu growler son:</h2>

        <StoreItem
          v-for="item in stores"
          :key="item._id"
          :id="item._id"
          :name="item.name"
          :address="item.address"
          :distance="item.distance.text"
        />
      </pull-to>

    </div>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import Onboarding from '/src/components/Onboarding'
import StoreItem from '/src/components/StoreItem'
import Loading from '/src/components/Loading'
import STORES_ALL from '/src/graphql/FindByProximity.graphql'
import user from '/src/user'

export default {
  name: 'Home',

  components: {
    Onboarding,
    StoreItem,
    Loading,
    PullTo,
  },

  data: () => ({
    isFirstLaunch: false,
    stores: null,
    pullBottomConfig: {
      pullText: 'Release to refresh...', // The text is displayed when you pull down
      triggerText: 'Release to refresh...', // The text that appears when the trigger distance is pulled down
      loadingText: 'Loading...', // The text in the load
      doneText: '', // Load the finished text
      failText: 'Fail', // Load failed text
      loadedStayTime: 400, // Time to stay after loading ms
      stayDistance: 50, // Trigger the distance after the refresh
      triggerDistance: 70 // Pull down the trigger to trigger the distance
    }
  }),

  mounted() {
    setTimeout(() => {
      this.findAll()
    }, 600)
  },

  methods: {
    findAll(data) {
      this.$apollo.query({
        query: STORES_ALL,
        variables: {
          latitude: data ? data.lat : this.$store.state.userData.lat,
          longitude: data ? data.long : this.$store.state.userData.long,
        },
      }).then((result) => {
        this.stores = result.data.findByProximity
      }).catch(() => {
        // console.error(error)
      })
    },

    async refresh(loaded) {
      const data = await user.getUserGeo()
      this.findAll(data)
      loaded('done')
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
