<template>
  <div id="app" class="App" :class="{'App--alt': $route.name === 'splash'}">
    <div class="App-body">
      <div class="App-bg"></div>
      <v-header v-if="$route.name !== 'splash'"/>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import user from '@/user'
import vHeader from '@/components/v-Header'

export default {
  name: 'App',

  components: {
    vHeader
  },

  async created () {
    this.$store.commit('setUserData', await user.getUserData())
  }
}
</script>

<style>
@import "~/assets/icon/icons.css";

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
}

.App-bg {
  position: absolute;
  height: 100vh;
  width: 100%;
  opacity: 0.5;
  background-image: url(assets/img/bgr-dirt.svg);
  background-size: 300px;
  z-index: -1;
}

.App-body {
  padding-top: 70px;
}

.App--alt .App-body {
  padding-top: 0;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
