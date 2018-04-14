<template>
  <div class="StoreItem">
    <div class="StoreItem-body">
      <div class="StoreItem-meta">
        <div>
          <h3 class="StoreItem-meta-title" v-text="title"></h3>
          <div class="StoreItem-meta-address" v-text="address"></div>
        </div>
        <div class="Store-meta-distance" v-text="distance"></div>
      </div>

      <div class="StoreItem-action">
        <button>+</button>
        <button>pin</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreItem',

  props: [
    'title',
    'address',
    'distance',
  ],

  data: () => ({
  }),

  methods: {}
}
</script>

<style>
.StoreItem {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-yellow);
}

.StoreItem:last-child {
  border: 0;
}

.StoreItem-meta-title {
  font-size: 2rem;
  margin-bottom: 10px;
  margin-top: 0;
}
</style>
