<template>
  <div class="StoreItemFull">
    <div class="StoreItemFull-status">
      <i class="ico-time"></i>
      <span>Abierto</span>
    </div>
    <div class="StoreItemFull-name">
      {{name}}
    </div>
    <div class="StoreItemFull-address">
      <i class="ico-location"></i>
      <span>{{address}}</span>
    </div>
    <div class="StoreItemFull-distance">
      <i class="ico-location-gps"></i>
      <span>{{distance.replace(',', '.')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreItemFull',

  props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    distance: {
      type: String
    }
  },

  data: () => ({}),

  methods: {}
}
</script>

<style>
.StoreItemFull {
  position: relative;
}

.StoreItemFull-header {
  padding: 10px 0;
  position: relative;
  display: flex;
}

.StoreItemFull-header-left {
  opacity: 0.6;
}

.StoreItemFull-header-left i {
  font-size: 4.4rem;
  line-height: 0;
}

.StoreItemFull {
  font-size: 1rem;
}

.StoreItemFull i {
  vertical-align: -3px;
  font-size: 1rem;
  margin-right: 4px;
  color: var(--color-red);
}

.StoreItemFull-name {
  font-family: var(--font-family-primary);
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.StoreItemFull-address {
  margin-bottom: 2px;
}

.StoreItemFull-distance {
  font-family: var(--font-family-primary);
  font-weight: 600;
  letter-spacing: 1px;
}

.StoreItemFull-distance i {
  font-size: .9rem;
}

.StoreItemFull-status {
  font-family: var(--font-family-primary);
  font-weight: bold;
  text-transform: uppercase;
  color: var(--color-green);
  font-size: 0.8rem;
}

.StoreItemFull-status i {
  vertical-align: -3px;
  font-size: .9rem;
  color: var(--color-green);
}

.StoreItemFull-status span {
  letter-spacing: .4px;
}
</style>
