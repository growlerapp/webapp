<template>
  <div id="app" class="App" :class="{'App--alt': $route.name === 'splash'}">
    <div class="App-body">
      <v-header v-if="$route.name !== 'splash'"/>
      <transition name="fade">
        <div>
          <router-view />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/v-Header'
import { checkUserGeoData } from '@/services/user'

export default {
  name: 'App',

  components: {
    vHeader
  },

  mounted () {
    /**
     * Busca si existe geo data almacenada localmente
     * de lo contrario devuelve a vista splash
     */
    if (checkUserGeoData()) {
      this.$store.dispatch('userGeoData', { force: false })
    } else {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style>
@import "../public/icons/icons.css";

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-size: 14px;
  font-family: var(--font-family-primary);
  line-height: 1.2;
  background: var(--color-background);
  color: var(--color-base);
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url(/img/bgr-dirt.svg);
  background-size: 300px;
}

.App-body {
  padding-top: 70px;
  max-width: 560px;
  margin: 0 auto;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

h1,
h2,
h3 {
  font-family: var(--font-family-primary);
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.u-title {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

/**
 * Vue transitions
 */

/*fade*/

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
