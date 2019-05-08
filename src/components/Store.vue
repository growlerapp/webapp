<template>
  <div class="Store">
    <div class="Store-body" v-if="store">
      <h2 class="Store-name" v-text="store.name"></h2>

      <div class="Store-data">
        <div>
          Dirección: {{ store.address }}
        </div>
        <div>
          Distancia: {{ store.matrix.distance }}
        </div>
        <div>
          Tiempo: {{ store.matrix.duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import STORE from '/src/graphql/FindOne.graphql'

export default {
  name: 'Store',

  data: () => ({
    store: null
  }),

  mounted() {
    this.find()
  },

  methods: {
    find() {
      this.$apollo.query({
        query: STORE,
        variables: {
          id: this.$route.params.id,
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long,
        },
      }).then((result) => {
        const copy = Object.assign({}, result.data.findOne)
        copy.matrix = copy.matrix.find(({ mode }) => mode === 'driving')
        this.store = copy
        console.log
      }).catch((error) => {
        console.error(error)
      })
    }
  },
}
</script>

<style>
.Store-name {
  margin-top: 0;
  font-size: 2rem;
}
</style>
