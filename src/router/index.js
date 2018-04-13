import Vue from 'vue'
import Router from 'vue-router'
import App from '~/src/components/App'
import About from '~/src/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
})
