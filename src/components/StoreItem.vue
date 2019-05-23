<template>
  <router-link :to="'/store/' + id">
    <div class="StoreItem">
      <div class="StoreItem-header">
        <div class="StoreItem-header-right">
          <div class="StoreItem-meta">
            <div class="StoreItem-meta-name">{{name}}</div>
            <div class="StoreItem-meta-address">
              <i class="ico-location"></i>
              <span>{{address}}</span>
            </div>
            <div class="StoreItem-meta-distance">
              <i class="ico-location-gps"></i>
              <span>{{distance.replace(',', '.')}}</span>
            </div>
          </div>
          <div
            class="StoreItem-header-status"
            :class="{'StoreItem-header-status--isActive': openNow}"
          >
            <i class="ico-time"></i>
            <span>
              {{ openNow ? 'Abierto' : 'Cerrado' }}
            </span>
          </div>
        </div>
      </div>
      <div class="StoreItem-image" :style="{ 'background-image': 'url(' + getPhoto(photo) + ')' }"></div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'StoreItem',

  props: {
    id: {
      type: String,
      required: true
    },
    photo: {
      type: String
    },
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
      type: Boolean,
      required: true
    }
  },

  methods: {
    getPhoto (photo) {
      return photo && photo.length ? photo : '/img/img-bar.jpg'
    }
  }
}
</script>

<style>
.StoreItem {
  margin: 20px;
}

.StoreItem-header {
  padding: 10px 0;
  position: relative;
  display: flex;
}

.StoreItem-header-left {
  opacity: 0.6;
}

.StoreItem-header-left i {
  font-size: 4.4rem;
  line-height: 0;
}

.StoreItem-meta {
  font-size: 0.9rem;
  margin-top: 2px;
}

.StoreItem-meta i {
  vertical-align: -3px;
  font-size: 1rem;
  margin-right: 4px;
  color: var(--color-red);
}

.StoreItem-meta-name {
  font-family: var(--font-family-primary);
  font-weight: 600;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.StoreItem-meta-address {
  margin-bottom: 2px;
}

.StoreItem-meta-distance {
  font-family: var(--font-family-primary);
  font-weight: 600;
  letter-spacing: 1px;
}

.StoreItem-meta-distance i {
  font-size: 0.9rem;
}

.StoreItem-header-status {
  position: absolute;
  right: 0;
  top: 16px;
  font-family: var(--font-family-primary);
  font-weight: bold;
  text-transform: uppercase;
  color: var(--color-red);
  font-size: 0.8rem;
}

.StoreItem-header-status i {
  vertical-align: -2px;
}

.StoreItem-header-status span {
  letter-spacing: 0.4px;
}

.StoreItem-header-status--isActive span,
.StoreItem-header-status--isActive i {
  color: var(--color-green);
}

.StoreItem-image {
  height: 200px;
  background-size: cover;
  background-position: 50%;
  background-image: url(../assets/img/img-bar.jpg);
  border-radius: var(--border-radius-base);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

@media (--lg-viewport) {
  .StoreItem-image {
    height: 240px;
  }
}
</style>
