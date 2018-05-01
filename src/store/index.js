import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    userData: {},
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    setUserData(state, value) {
      state.userData = value
    },
  }
})
