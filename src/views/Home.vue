<template>
  <div class="Home pull-to-refresh-ios">
    <loading v-if="!isfetchError && loading"/>

    <div class="pull-to-refresh-ios__spinner">
      <div
        class="pull-to-refresh-ios__blade"
        v-for="n in 12"
        :key="n"
      ></div>
    </div>

    <div class="pull-to-refresh-ios__main">
      <transition-group
        v-if="stores && isGeoError === null"
        name="fade"
        tag="div"
        class="Home-body"
        appear
      >
        <StoreItem
          v-for="store in stores"
          :key="store._id"
          :id="store._id"
          :name="store.name"
          :address="store.address"
          :distance="store.matrix.distance"
          :photo="store.place.photo"
          :openNow="store.place.schedule ? store.place.schedule.openNow : null"
        />
      </transition-group>

      <div class="Home-error" v-if="stores && !stores.length">
        <img class="Home-error-icon" src="/img/img-growler-empty.svg" alt="growler">
        <h2>
          No encontramos bares cercanos
        </h2>
        <p>
          Prueba
          <span v-show="isTouchDevice()">deslizar hacia abajo</span>
          <span v-show="!isTouchDevice()">recargar</span>
          para actualizar
        </p>
        <img class="Home-error-sep" src="/img/img-separator.svg" alt="sep">
        <small>
          Próximamente podrás agregar nuevos bares que sean de tu interés
        </small>
      </div>

      <div class="Home-error" v-if="isfetchError">
        <img class="Home-error-icon" src="/img/img-growler-empty.svg" alt="growler">
        <h2>
          Ha ocurrido <br> un error al obtener información
        </h2>
        <p>
          Prueba
          <span v-show="isTouchDevice()">deslizar hacia abajo</span>
          <span v-show="!isTouchDevice()">recargar</span>
          para actualizar
        </p>
        <v-button @click.native="fetchData(true, true)">Reintentar</v-button>
      </div>

      <div class="Home-error" v-if="isGeoError !== null">
        <img class="Home-error-icon" src="/img/img-growler-empty.svg" alt="growler">
        <template v-if="isGeoError === 0">
          <h2>Debes autorizar la geolocalización en tu dispositivo para continuar</h2>
        </template>
        <template v-else-if="isGeoError === 1">
          <h2>No podemos detectar donde te encuentras</h2>
        </template>
        <template v-else>
          <h2>Ha ocurrido un error tratando de obtener tu geolocalización</h2>
        </template>
        <p>
          Prueba
          <span v-show="isTouchDevice()">deslizar hacia abajo</span>
          <span v-show="!isTouchDevice()">recargar</span>
          para actualizar
        </p>
        <div class="Splash-continue">
          <v-button @click.native="fetchData()">Reintentar</v-button>
        </div>
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
import vButton from '@/components/v-Button'

export default {
  name: 'Home',

  components: {
    StoreItem,
    Loading,
    vButton
  },

  mounted () {
    this.fetchData()
    this.pullToRefresh()
  },

  data: () => ({
    loading: true,
    isfetchError: null,
    isGeoError: null
  }),

  apollo: {
    stores: {
      query: FIND_BY_PROXIMITY,
      variables () {
        return {
          latitude: this.$store.state.userData.lat,
          longitude: this.$store.state.userData.long,
          googleMapsKey: process.env.VUE_APP_GOOGLE_MAPS_KEY
        }
      },
      $query: {
        fetchPolicy: 'network-only'
      },
      update ({ findByProximity }) {
        this.loading = false
        return findByProximity && findByProximity.map(store => {
          const copy = Object.assign({}, store)
          copy.matrix = store.matrix.find(({ mode }) => mode === 'driving')
          return copy
        })
      },
      error () {
        this.isfetchError = true
      },
      skip: true
    }
  },

  methods: {
    pullToRefresh () {
      const context = this
      pullToRefresh({
        container: document.querySelector('.Home'),
        animates: ptrAnimatesIos,
        async refresh () {
          await context.fetchData(false)
        }
      })
    },

    async fetchData (loading = true, reload = false) {
      if (reload) window.location.reload(true)
      try {
        await this.$store.dispatch('userGeoData', { force: true })
        this.isGeoError = null
        this.isfetchError = null
        this.loading = loading
        this.$apollo.queries.stores.skip = false
        await this.$apollo.queries.stores.refetch()
      } catch (error) {
        this.loading = false
        this.isGeoError = error.code
      }
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

.Home-error {
  text-align: center;
  padding-top: 4em;
  max-width: 280px;
  margin: 0 auto;
}
.Home-error h2 {
  text-transform: uppercase;
  line-height: 1.5;
}
.Home-error p {
  font-size: 1.2rem;
  font-family: var(--font-family-normal);
}
.Home-error-icon {
  max-width: 80px;
  display: inline-block;
  opacity: .4;
  transform: rotate(10deg);
}
@media (--lg-viewport) {
  .Home-error-icon {
    max-width: 120px;
  }
}
.Home-error-sep {
  display: inline-block;
  width: 120px;
}
.Home-error small {
  display: inline-block;
  margin-top: 1em;
  text-transform: uppercase;
  line-height: 1.4;
}
</style>
