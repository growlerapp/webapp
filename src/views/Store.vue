<template>
  <div class="Store">
    <loading v-if="!store"/>

    <transition name="fade">
      <div v-if="store">
        <div class="Store-map" :style="{backgroundImage: 'url(' + getStaticMap + ')'}"></div>

        <div class="Store-body">
          <StoreItemFull
            :name="store.name"
            :address="store.address"
            :distance="store.distance.text"
          />

          <div class="Store-arriving">
            <div class="u-title">Llegarías en</div>

            <div class="Store-arriving-list">
              <div>
                <i class="ico-walking"></i>
                <div>20 min</div>
              </div>
              <div>
                <i class="ico-cycling"></i>
                <div>10 min</div>
              </div>
              <div>
                <i class="ico-bus"></i>
                <div>6 min</div>
              </div>
              <div>
                <i class="ico-car"></i>
                <div>4 min</div>
              </div>
            </div>
          </div>

          <img class="Store-sep" src="/img/img-separator.svg" alt="sep">

          <div class="Store-types">
            <div class="u-title">Tipos de cervezas</div>

            <div class="Store-types-list">
              <div>Growler IPA | 7º | IBU 50</div>
              <div>Cuello negro ambar | 5º | IBU 20</div>
              <div>Kross golden | 5,3º | IBU 25</div>
              <div>Jester saison | 6º</div>
            </div>
          </div>

          <img class="Store-sep" src="/img/img-separator.svg" alt="sep">

          <div class="Store-values">
            <div class="u-title">Valores</div>

            <div>Entre $3000 y $6000 pesos por litro</div>
          </div>
        </div>

        <div class="Store-footer">
          <img class="Store-footer-hop" src="/img/img-hop.svg" alt="hop">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import FIND_BY_ONE from '@/graphql/FindByOne.gql'
import Loading from '@/components/Loading'
import StoreItemFull from '@/components/StoreItemFull'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: 'places'
  }
})

export default {
  name: 'Store',

  components: {
    Loading,
    StoreItemFull
  },

  data: () => ({
    store: null
  }),

  mounted () {
    this.$store.commit('setInStore', true)
  },

  beforeDestroy () {
    this.$store.commit('setInStore', false)
  },

  computed: {
    getStaticMap () {
      if (this.store) {
        const googleMapsKey = process.env.VUE_APP_GOOGLE_MAPS_KEY
        const storeLat = this.store.geometry.coordinates[1]
        const storeLong = this.store.geometry.coordinates[0]
        return `https://maps.googleapis.com/maps/api/staticmap?center=${storeLat},${storeLong}&zoom=17&size=400x300&maptype=roadmap&markers=color:red%7Clabel:Bar%7C${storeLat},${storeLong}&key=${googleMapsKey}`
      }
    }
  },

  apollo: {
    store: {
      query: FIND_BY_ONE,
      variables () {
        return {
          id: this.$route.params.id,
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long
        }
      },
      update (result) {
        return result.findByProximity[0]
      }
    }
  }
}
</script>

<style>
.Store-body {
  padding: 20px;
  margin-top: -80px;
}

.Store-name {
  margin-top: 0;
  font-size: 2rem;
}

.Store-map {
  background-image: url(/img/img-map.jpg);
  background-position: 50%;
  background-size: cover;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.Store-map:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent 0%, #fafbf1);
}

.Store-map-image {
  max-width: 100%;
}

.Store-sep {
  display: block;
  margin: 20px auto;
  width: 120px;
  opacity: 0.6;
}

.Store-arriving {
  margin-top: 40px;
}

.Store-arriving-list {
  display: grid;
  grid-auto-flow: column;
}

.Store-arriving-list i {
  font-size: 2.4rem;
  vertical-align: middle;
}

.Store-arriving-list > div {
  text-align: center;
}

.Store-types,
.Store-values {
  margin-top: 40px;
}

.Store-types-list > div {
  margin-bottom: 4px;
}

.Store-footer {
  text-align: center;
  margin: 10px 0 40px;
}

.Store-footer-hop {
  width: 40px;
}
</style>
