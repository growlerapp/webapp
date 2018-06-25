<template>
  <div class="Home">
    <Onboarding v-if="isFirstLaunch"/>

    <loading v-if="!stores"/>

    <div
      v-if="stores"
      class="Home-body">
      <vue-pull-refresh
        :on-refresh="refresh()"
        :config="refreshConfig">
        <h2 class="Home-title">Los bares más cercanos para llenar tu growler son:</h2>
        <div class="Home-list">
          <StoreItem
            v-for="item in stores"
            :key="item._id"
            :id="item._id"
            :name="item.name"
            :address="item.address"
            :distance="item.distance.text"
          />
        </div>
      </vue-pull-refresh>
    </div>
  </div>
</template>

<script>
import VuePullRefresh from 'vue-pull-refresh'
import Onboarding from '@/components/Onboarding'
import StoreItem from '@/components/StoreItem'
import Loading from '@/components/Loading'
import STORES_ALL from '@/graphql/FindByProximity.gql'
import user from '@/user'

export default {
  name: 'Home',

  components: {
    Onboarding,
    StoreItem,
    Loading,
    'vue-pull-refresh': VuePullRefresh
  },

  data: () => ({
    isFirstLaunch: false,
    stores: null,
    refreshConfig: {
      readyLabel: 'Suelta para refrescar...',
      startLabel: 'Suelta para refrescar...',
      loadingLabel: 'Cargando...',
      doneText: '',
      errorLabel: '¡Error!'
    }
  }),

  mounted () {
    this.refresh()
  },

  methods: {
    findAll (data) {
      this.$apollo
        .query({
          query: STORES_ALL,
          variables: {
            latitude: data ? data.lat : this.$store.state.userData.lat,
            longitude: data ? data.long : this.$store.state.userData.long
          }
        })
        .then(result => {
          this.stores = result.data.findByProximity
        })
        .catch(error => {
          console.error(error) // eslint-disable-line
        })
    },

    refresh () {
      setTimeout(async () => {
        const data = await user.getUserGeo()
        this.findAll(data)
      })
    }
  }
}
</script>

<style>
.Home {
  padding: 20px;
  margin-top: 60px;
}

.Home-title {
  color: var(--color-black);
  font-size: 2rem;
  text-align: center;
  margin-top: 10px;
}

@media (--lg-viewport) {
  .Home-title {
    margin: 30px 0;
  }
}

.Home-body > a {
  display: block;
  text-decoration: none;
  color: inherit;
}

.Home-body > div {
  height: auto !important;
}

@media (--lg-viewport) {
  .Home-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2em;
  }
}

/* Pull to refresh styles */
.pull-down-header {
  background-color: transparent !important;
}

.pull-down-content {
  color: inherit !important;
  font-size: 12px !important;
  max-width: 100% !important;
  border: 0 !important;
}

.pull-down-content--icon {
  display: none !important;
}

.pull-down-content--label {
  margin: 0 !important;
}
</style>
