<template>
  <div class="Home">
    <loading v-if="!findByProximity"/>

    <transition-group
      v-if="findByProximity"
      name="fade"
      tag="div"
      class="Home-body"
      appear
    >
      <StoreItem
        v-for="store in findByProximity"
        :key="store._id"
        :id="store._id"
        :name="store.name"
        :address="store.address"
        :distance="store.matrix.distance"
        :photo="store.place.photo"
        :openNow="store.place.schedule.openNow"
      />
    </transition-group>
  </div>
</template>

<script>
import FIND_BY_PROXIMITY from '@/graphql/FindByProximity.gql'
import StoreItem from '@/components/StoreItem'
import Loading from '@/components/Loading'

export default {
  name: 'Home',

  components: {
    StoreItem,
    Loading
  },

  apollo: {
    findByProximity: {
      query: FIND_BY_PROXIMITY,
      variables () {
        return {
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long,
          googleMapsKey: process.env.VUE_APP_GOOGLE_MAPS_KEY
        }
      },
      update ({ findByProximity }) {
        return findByProximity.map(store => {
          const copy = Object.assign({}, store)
          copy.matrix = store.matrix.find(({ mode }) => mode === 'driving')
          return copy
        })
      }
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
