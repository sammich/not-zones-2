import * as types from './mutation-types'

export const updateThemePreference = ({ commit }, theme) => {
  commit(types.UPDATE_PREF_THEME, {
    theme
  })
}

export const updateShowCountryPreference = ({ commit }, boolValue) => {
  commit(types.UPDATE_SHOW_COUNTRY, {
    boolValue
  })
}

export const addCity = ({ commit }, zoneName) => {
  commit(types.ADD_CITY, {
    zoneName
  })
}
