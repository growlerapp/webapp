import Vue from 'vue'
import Vuex from 'vuex'
import { getUserData } from '@/services/user'

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
    setUserGeoData (state, value) {
      state.userData = value
    },
    setMenu (state, value) {
      state.isMenuActive = value
    },
    setInStore (state, value) {
      state.isInStore = value
    }
  },

  actions: {
    userGeoData ({ commit }, { force }) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setUserGeoData', await getUserData(force))
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
