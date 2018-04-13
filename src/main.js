import Vue from 'vue'
import router from './router'
import App from './components/App'

new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})