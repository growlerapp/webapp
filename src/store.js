import Vue from 'vue'
import Vuex from 'vuex'
import { getUserData } from '@/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    userData: {},
    isMenuActive: false,
    isInStore: false
  },

  mutations: {
    setLoading (state, value) {
      state.loading = value
    },
    async setUserGeoData (state, { force = false }) {
      const data = await getUserData(force)
      state.userData = data
    },
    setMenu (state, value) {
      state.isMenuActive = value
    },
    setInStore (state, value) {
      state.isInStore = value
    }
  },

  actions: {
    userGeoData ({ commit }, payload) {
      commit('setUserGeoData', payload)
    }
  }
})
