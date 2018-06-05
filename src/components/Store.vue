<template>
  <div class="Store">
    <loading v-if="!store"/>

    <div class="Store-body" v-if="store">
      <h2 class="Store-name">{{ store.name }}</h2>
      <div class="Store-data">
        <p>
          Dirección: {{ store.address }}
        </p>
        <p>
          Distancia: {{ store.distance.text }}
        </p>
        <p>
          Tiempo: {{ store.duration.text }} (auto)
        </p>
        <div class="Store-map">
          <GmapMap
            :center="{lat: store.geometry.coordinates[1], lng: store.geometry.coordinates[0]}"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
            :options="{scrollwheel: false}"
          >
            <GmapMarker
              :position="{lat: store.geometry.coordinates[1], lng: store.geometry.coordinates[0]}"
              :clickable="false"
              :draggable="false"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Loading from '/src/components/Loading'

import STORE_QUERY from '/src/graphql/FindByOne.gql'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_KEY,
    libraries: 'places',
  },
})

export default {
  name: 'Store',

  components: {
    Loading,
  },

  data: () => ({
    store: null,
  }),

  mounted() {
    setTimeout(() => {
      this.getStore()
    }, 10)
  },

  methods: {
    getStore() {
      this.$apollo
        .query({
          query: STORE_QUERY,
          variables: {
            id: this.$route.params.id,
            latitude: this.$store.state.userData.lat,
            longitude: this.$store.state.userData.long,
          },
        })
        .then(result => (this.store = result.data.findByProximity[0]))
    },
  },
}
</script>

<style>
.Store {
  padding: 20px;
  margin-top: 60px;
}

.Store-name {
  margin-top: 0;
  font-size: 2rem;
}
</style>
