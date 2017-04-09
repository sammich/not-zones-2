import * as types from '../mutation-types'

const userPreferenceKey = 'zones-userPreferences'

let state

load()

function load() {
  let savedState = localStorage.getItem(userPreferenceKey)
  
  try {
    savedState = JSON.parse(savedState)
  } catch (e) {
    state = {
      theme: 'white',
      showCountry: false
    }
    
    return
  }

  if (savedState && savedState.theme && typeof savedState.theme === 'string') {
    state = savedState
  } else {
    state = {
      theme: 'white',
      showCountry: false
    }
  }
}

// getters
const getters = {
  theme: state => {
    return state.theme
  },
  showCountry: state => {
    return state.showCountry
  }
}

function persist() {
  console.log('module.userPreferences.state', state)
  localStorage.setItem(userPreferenceKey, JSON.stringify(state))
}

const actions = {}

const mutations = {
  [types.UPDATE_PREF_THEME](state, { theme }) {
    state.theme = theme
    persist()
  },
  [types.UPDATE_SHOW_COUNTRY](state, { boolValue }) {
    state.showCountry = boolValue
    persist()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
