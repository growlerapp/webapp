import Vue from 'vue'
import {
  apolloProvider
} from './apollo'

import router from './router'
import App from './components/App'

new Vue({
  el: '#root',
  router,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>',
  render: h => h(App),
})
