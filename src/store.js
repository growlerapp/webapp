import Vue from 'vue'
import Vuex from 'vuex'

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
    setUserData (state, value) {
      state.userData = value
    },
    setMenu (state, value) {
      state.isMenuActive = value
    },
    setInStore (state, value) {
      state.isInStore = value
    }
  }
})
