<template>
  <div
    id="app"
    class="App"
    :class="{'App--alt': $route.name === 'splash'}"
  >
    <Header v-if="$route.name !== 'splash'"/>

    <div class="App-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import user from '@/user'

export default {
  name: 'App',

  components: {
    Header
  },

  async created () {
    this.$store.commit('setUserData', await user.getUserData())
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-size: 14px;
  font-family: var(--font-family-normal);
  line-height: 1.2;
  background: #f3f5e3;
  color: #2c332d;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

.App-body {
  margin-top: 60px;
  padding: 20px;
}

.App--alt .App-body {
  margin: 0;
  padding: 0;
}
</style>
