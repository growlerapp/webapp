import Vue from 'vue'
import Router from 'vue-router'
import Home from '~/src/components/Home'
import About from '~/src/components/About'
import Splash from '~/src/components/Splash'
import Store from '~/src/components/Store'
import user from '~/src/user'

Vue.use(Router)

const requireUser = (to, from, next) => {
  if (!user.checkUserData()) {
    next({
      path: '/',
    })
  } else {
    next()
  }
}

export default new Router({
  // mode: 'history',

  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: requireUser,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/store/:id',
      name: 'store',
      component: Store,
    },
  ],
})
