<template>
  <div class="Home pull-to-refresh-ios">
    <loading v-if="!findByProximity"/>

    <div class="pull-to-refresh-ios__spinner">
      <div
        class="pull-to-refresh-ios__blade"
        v-for="n in 12"
        :key="n"
      ></div>
    </div>

    <div class="pull-to-refresh-ios__main">
      <transition-group
        v-if="findByProximity"
        name="fade"
        tag="div"
        class="Home-body"
        appear
      >
        <StoreItem
          v-for="store in findByProximity"
          :key="store._id"
          :id="store._id"
          :name="store.name"
          :address="store.address"
          :distance="store.matrix.distance"
          :photo="store.place.photo"
          :openNow="store.place.schedule ? store.place.schedule.openNow : null"
        />
      </transition-group>

      <div class="Home-empty" v-if="findByProximity && !findByProximity.length">
        <img class="Home-empty-icon" src="/img/img-growler-empty.svg" alt="growler">
        <h2>
          No encontramos bares cercanos
        </h2>
        <p>
          Prueba
          <span v-show="isTouchDevice()">deslizar hacia abajo</span>
          <span v-show="!isTouchDevice()">recargar</span>
          para actualizar
        </p>
        <img class="Home-empty-sep" src="/img/img-separator.svg" alt="sep">
        <small>
          Próximamente podrás agregar nuevos bares que sean de tu interés
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import pullToRefresh from 'mobile-pull-to-refresh'
import ptrAnimatesIos from 'mobile-pull-to-refresh/dist/styles/ios/animates'
import 'mobile-pull-to-refresh/dist/styles/ios/style.css'

import FIND_BY_PROXIMITY from '@/graphql/FindByProximity.gql'
import StoreItem from '@/components/StoreItem'
import Loading from '@/components/Loading'

export default {
  name: 'Home',

  components: {
    StoreItem,
    Loading
  },

  mounted () {
    this.refresh()
  },

  apollo: {
    findByProximity: {
      query: FIND_BY_PROXIMITY,
      variables () {
        return {
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long,
          googleMapsKey: process.env.VUE_APP_GOOGLE_MAPS_KEY
        }
      },
      update ({ findByProximity }) {
        return findByProximity.map(store => {
          const copy = Object.assign({}, store)
          copy.matrix = store.matrix.find(({ mode }) => mode === 'driving')
          return copy
        })
      }
    }
  },

  methods: {
    refresh () {
      const context = this
      pullToRefresh({
        container: document.querySelector('.Home'),
        animates: ptrAnimatesIos,
        async refresh () {
          context.$store.dispatch('userGeoData', { force: true })
          await context.$apollo.queries.findByProximity.refetch()
        }
      })
    },

    isTouchDevice () {
      // https://stackoverflow.com/a/4819886/1832887
      const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
      const mq = (query) => {
        return window.matchMedia(query).matches
      }
      // eslint-disable-next-line
      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true
      }
      // include the 'heartz' as a way to have a non matching MQ to help terminate the join
      // https://git.io/vznFH
      const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
      return mq(query)
    }
  }
}
</script>

<style>
.Home-title {
  color: var(--color-black);
  font-size: 2rem;
  text-align: center;
  margin-top: 10px;
}

@media (--lg-viewport) {
  .Home-body {
    padding-top: 1em;
  }

  .Home-title {
    margin: 30px 0;
  }
}

.Home-body > a {
  display: block;
  text-decoration: none;
  color: inherit;
}

.Home-body > div {
  height: auto !important;
}

@media (--lg-viewport) {
  .Home-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2em;
  }
}

.Home-empty {
  text-align: center;
  padding-top: 4em;
  max-width: 280px;
  margin: 0 auto;
}
.Home-empty h2 {
  text-transform: uppercase;
  line-height: 1.5;
}
.Home-empty p {
  font-size: 1.2rem;
  font-family: var(--font-family-normal);
}
.Home-empty-icon {
  max-width: 80px;
  display: inline-block;
  opacity: .4;
  transform: rotate(10deg);
}
@media (--lg-viewport) {
  .Home-empty-icon {
    max-width: 120px;
  }
}
.Home-empty-sep {
  display: inline-block;
  width: 120px;
}
.Home-empty small {
  display: inline-block;
  margin-top: 1em;
  text-transform: uppercase;
  line-height: 1.4;
}
</style>
