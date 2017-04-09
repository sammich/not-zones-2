import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import savedCities from './modules/savedCities'
import userPreferences from './modules/userPreferences'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    savedCities,
    userPreferences
  },
  strict: debug
})
