<template>
  <div class="App">
    <Header v-if="$route.name !== 'splash'"/>

    <div class="App-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '~/src/components/Header'

export default {
  name: 'App',

  components: {
    Header,
  },
}
</script>

<style>
@import '~/src/styles/base.css';

.App-body {
  padding: 20px;
  margin-top: 60px;
}
</style>
