<template>
  <div class="Store">
    <loading v-if="!findOne"/>

    <transition name="fade">
      <div v-if="findOne">
        <div
          class="Store-map"
          :class="{'isFullScreen' : isFullScreenMap}"
          :style="{backgroundImage: 'url(' + getStaticMap + ')'}"
          @click="!isFullScreenMap ? toggleFullScreenMap() : false"
        >
          <transition name="fade">
            <template v-if="isFullScreenMap">
              <GmapMap
                :center="{
                  lat: findOne.geometry.coordinates[1],
                  lng: findOne.geometry.coordinates[0]
                }"
                :zoom="17"
                map-type-id="terrain"
              >
                <GmapMarker
                  :position="{
                    lat: findOne.geometry.coordinates[1],
                    lng: findOne.geometry.coordinates[0]
                  }"
                  :clickable="false"
                  :draggable="false"
                />
              </GmapMap>
            </template>
          </transition>

          <div
            class="Store-map-bottom"
            @click.stop="toggleFullScreenMap()"
          >
            Cerrar mapa
          </div>
        </div>

        <div class="Store-body" v-show="!isFullScreenMap">
          <StoreItemFull
            :name="findOne.name"
            :address="findOne.address"
            :distance="getMatrix(findOne.matrix, 'driving', 'distance')"
            :openNow="findOne.place.schedule.openNow"
          />

          <div class="Store-arriving">
            <div class="u-title">Llegarías en</div>

            <div class="Store-arriving-list">
              <div>
                <i class="ico-walking"></i>
                <div>{{ getMatrix(findOne.matrix, 'walking', 'duration') }}</div>
              </div>
              <!-- <div>
                <i class="ico-cycling"></i>
                <div>10 min</div>
              </div> -->
              <div>
                <i class="ico-bus"></i>
                <div>{{ getMatrix(findOne.matrix, 'transit', 'duration') }}</div>
              </div>
              <div>
                <i class="ico-car"></i>
                <div>{{ getMatrix(findOne.matrix, 'driving', 'duration') }}</div>
              </div>
            </div>
          </div>

          <img class="Store-sep" src="/img/img-separator.svg" alt="sep">

          <!-- <div class="Store-types">
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
          </div> -->
        </div>

        <div class="Store-footer" v-show="!isFullScreenMap">
          <img class="Store-footer-hop" src="/img/img-hop.svg" alt="hop">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import FIND_ONE from '@/graphql/FindOne.gql'
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
    findOne: null,
    isFullScreenMap: false
  }),

  mounted () {
    this.$store.commit('setInStore', true)
  },

  beforeDestroy () {
    this.$store.commit('setInStore', false)
    this.setBodyOverflow()
  },

  apollo: {
    findOne: {
      query: FIND_ONE,
      variables () {
        return {
          id: this.$route.params.id,
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long
        }
      }
    }
  },

  computed: {
    getStaticMap () {
      if (this.findOne) {
        const googleMapsKey = process.env.VUE_APP_GOOGLE_MAPS_KEY
        const storeLat = this.findOne.geometry.coordinates[1]
        const storeLong = this.findOne.geometry.coordinates[0]
        const width = '800'
        const height = '600'
        return `https://maps.googleapis.com/maps/api/staticmap?center=${storeLat},${storeLong}&zoom=18&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:Bar%7C${storeLat},${storeLong}&key=${googleMapsKey}`
      }
    }
  },

  methods: {
    getMatrix (data, findMode, param) {
      const matrix = data.find(({ mode }) => mode === findMode)
      return matrix ? matrix[param] : 'No disponible'
    },

    toggleFullScreenMap () {
      this.isFullScreenMap = !this.isFullScreenMap
      this.setBodyOverflow(this.isFullScreenMap)
      window.scrollTo(0, 0)
    },

    setBodyOverflow (value) {
      if (value) {
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.querySelector('body').style.overflow = 'auto'
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
  height: 340px;
  position: relative;
  overflow: hidden;
  transition: all .3s ease;
  cursor: pointer;
}

.Store-map.isFullScreen {
  /* height: calc(100vh - 70px); */
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.Store-map:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background-image: url(/img/img-map-mask.png);
  background-repeat: repeat-x;
  /* background: linear-gradient(to bottom, transparent 0%, #fafbf1); */
}

.Store-map.isFullScreen:after {
  display: none;
}

.Store-map-image {
  max-width: 100%;
}

.Store-map-bottom {
  background-color: var(--color-red);
  color: var(--color-white);
  text-align: center;
  padding: 18px;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  opacity: 0;
  transition: all .2s ease;
  transform: translateY(100%);
}

.Store-map.isFullScreen .Store-map-bottom {
  opacity: 1;
  transform: translateY(0);
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

.Store-map .vue-map-container {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
