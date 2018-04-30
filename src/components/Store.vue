<template>
  <div class="Store">
    <div class="Store-body" v-if="store">
      <h2 class="Store-name" v-text="store.name"></h2>

      <div class="Store-data">
        <div>
          Dirección: {{ store.address }}
        </div>

        <div>
          Distancia: 2kms.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',

  data: () => ({
    store: null
  }),

  methods: {},
}
</script>

<style>
.Store-name {
  margin-top: 0;
  font-size: 2rem;
}
</style>
