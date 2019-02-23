<template>
  <div class="Home">
    <loading v-if="!stores"/>

    <div
      v-if="stores"
      class="Home-body">
      <StoreItem
        v-for="item in stores"
        :key="item._id"
        :id="item._id"
        :name="item.name"
        :address="item.address"
        :distance="item.distance.text"
        :image="item.image"
      />
    </div>
  </div>
</template>

<script>
import FIND_BY_PROXIMITY from '@/graphql/FindByProximity.gql'
import StoreItem from '@/components/StoreItem'
import Loading from '@/components/Loading'
import user from '@/user'

export default {
  name: 'Home',

  components: {
    StoreItem,
    Loading
  },

  data: () => ({
    stores: null
  }),

  mounted () {
    this.refresh()
  },

  methods: {
    refresh () {
      setTimeout(async () => {
        const data = await user.getUserGeo()
        this.findAll(data)
      })
    },

    findAll (data) {
      this.$apollo
        .query({
          query: FIND_BY_PROXIMITY,
          variables: {
            latitude: data ? data.lat : this.$store.state.userData.lat,
            longitude: data ? data.long : this.$store.state.userData.long
          }
        })
        .then(({ data: { findByProximity } }) => (this.stores = findByProximity))
        .catch(error => {
          console.error(error) // eslint-disable-line
        })
    }
  }
}
</script>

<style>
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
