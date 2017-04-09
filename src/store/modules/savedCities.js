import * as types from '../mutation-types'
import * as moment from 'moment-timezone'

const savedCitiesKey = 'zones-savedCities'

let state

load()

const getters = {
  savedCities: state => {
    const userZone = moment.tz.zone(moment.tz.guess())
    const userOffset = userZone.offset(moment())
  
    let zones = state.cities.reduce((zones, zone) => {
      if (zone.indexOf('/') > -1 || !zone.startsWith('Etc')) {
        let zoneObj = moment.tz.zone(zone)
        
        if (!zoneObj) return zones
        
        let nowMoment = moment()
        let nowMomentZone = nowMoment.tz(zone)
        let zoneOffset = zoneObj.offset(nowMoment)
  
        if (!zoneObj.canonicalName) {
          zoneObj.canonicalName = zoneObj.name
        }
        
        zoneObj.name = zoneObj.canonicalName.replace(/\//g, ' - ').replace(/_/g, ' ') // a
        zoneObj.tzDisplay = nowMomentZone.format('z') // a
        let relativeOffset = (userOffset - zoneOffset) / 60 // `${userOffset} - ${zoneOffset} = ${userOffset - zoneOffset}`
      
        if (relativeOffset === 0) {
          zoneObj.offsetDisplay = 'same'
        } else if (relativeOffset > 0) {
          zoneObj.offsetDisplay = `${relativeOffset} hour${plurals(relativeOffset)} ahead`
        } else {
          zoneObj.offsetDisplay = `${-relativeOffset} hour${plurals(relativeOffset)} behind`
        }
      
        zones.push(zoneObj)
      
        return zones
      }
    }, [])
    
    return zones
  
    function plurals(num) {
      return num === 1 ? '' : 's'
    }
  }
}

function load() {
  let savedState = localStorage.getItem(savedCitiesKey)
  
  try {
    savedState = JSON.parse(savedState)
  } catch (e) {
    state = {
      cities: []
    }
    
    return
  }
  
  if (savedState && savedState.cities && savedState.cities instanceof Array) {
    state = savedState
  } else {
    state = {
      cities: []
    }
  }
}

function persist() {
  console.log('module.savedcities.state', state)
  localStorage.setItem(savedCitiesKey, JSON.stringify(state))
}

const actions = {}

const mutations = {
  [types.ADD_CITY](state, { zoneName }) {
    if (state.cities.indexOf(zoneName) === -1) {
      state.cities.push(zoneName)
      persist()
    }
  },
  [types.DELETE_CITY](state, { zoneName }) {
    const foundIndex = state.cities.indexOf(zoneName)
    if (foundIndex > -1) {
      state.cities.splice(foundIndex, 1)
  
      persist()
      return
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
