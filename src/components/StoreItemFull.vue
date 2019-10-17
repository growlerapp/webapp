<template>
  <div class="StoreItemFull">
    <div
      v-if="openNow !== null"
      class="StoreItemFull-status"
      :class="{'StoreItemFull-status--isActive': openNow}"
    >
      <i class="ico-time"></i>
      <span>
        {{ openNow ? 'Abierto' : 'Cerrado' }}
      </span>
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
      type: String,
      required: true
    },
    openNow: {
      validator: prop => typeof prop === 'boolean' || prop === null,
      required: true
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
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

@media (--sm-viewport) {
  .StoreItemFull-name {
    font-size: 2rem;
  }
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
  color: var(--color-red);
  font-size: 0.8rem;
}

.StoreItemFull-status i {
  vertical-align: -3px;
  font-size: .9rem;
}

.StoreItemFull-status span {
  letter-spacing: .4px;
}

.StoreItemFull-status--isActive span,
.StoreItemFull-status--isActive i {
  color: var(--color-green);
}
</style>
