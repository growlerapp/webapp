import Vue from 'vue'
import { apolloProvider } from './apollo'

import router from './router'
import store from './store'
import user from './user'
import App from './components/App'

new Vue({
  el: '#root',
  router,
  store,
  provide: apolloProvider.provide(),
  components: { App },

  async created() {
    this.$store.commit('setUserData', await user.getUserData())
  },
  template: '<App/>',
  render: h => h(App),
})
