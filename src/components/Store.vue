<template>
  <div class="Store">
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
          Tiempo: {{ store.duration.text }}
        </p>
        <div class="Store-map">
          <GmapMap
            :center="{lat:11, lng:11}"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 300px"
          >
            <GmapMarker
              :position="{lat:11, lng:11}"
              :clickable="true"
              :draggable="true"
              @click="center={lat:10, lng:10}"
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

import STORE from '/src/graphql/FindByOne.gql'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD0NV3B5PTJ9P8usxi58i6pi1JpH5XW1n8',
    libraries: 'places',
  },
})

export default {
  name: 'Store',

  data: () => ({
    store: null,
  }),

  mounted() {
    this.find()
  },

  methods: {
    find() {
      this.$apollo
        .query({
          query: STORE,
          variables: {
            id: this.$route.params.id,
            latitude: this.$store.state.userData.lat,
            longitude: this.$store.state.userData.long,
          },
        })
        .then(result => {
          this.store = result.data.findByProximity[0]
        })
        .catch(() => {
          console.error(error) // eslint-disable-line
        })
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
