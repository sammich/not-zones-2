<template>
  <div class="sam-view">
    <input v-model="cityFilter" placeholder="filter cities" class="sam-input text-center" autocomplete="off">

    <list-item v-if="!filteredZones.length">
      <div slot="left">
        No cities found
      </div>
      <div slot="right">
        :(
      </div>
    </list-item>

    <list-item v-for="zone in filteredZones" :key="zone.name" @click="addCity(zone)" :hover="!zone.saved">
      <div slot="left" :class="{ feint: zone.saved }">
        <span class="reset-select">
          {{zone.name}}<br>
          <span class="feint">{{zone.tzDisplay}}</span>
        </span>
      </div>
      <div slot="right" :class="{ feint: zone.saved }">
        <span class="reset-select">
          {{zone.offsetDisplay}}
        </span>
      </div>
    </list-item>
  </div>
</template>

<script>
import * as moment from 'moment-timezone'
import ListItem from './ListItem.vue'

export default {
  name: 'addcity',
  components: { ListItem },
  methods: {
    addCity: function (zone) {
      if (zone.saved) return

      this.$store.dispatch('addCity', zone.name)
      this.$router.push('home')
    }
  }, // mapActions([ 'addCity' ]),
  data() {
    const userZone = moment.tz.zone(moment.tz.guess())
    const userOffset = userZone.offset(moment())
    const savedCities = this.$store.getters.savedCities.map(z => z.canonicalName)

    let zones = moment.tz.names().reduce((zones, zone) => {
      if (zone.indexOf('/') > -1 || !zone.startsWith('Etc')) {
        let zoneObj = moment.tz.zone(zone)
        let nowMoment = moment()
        let nowMomentZone = nowMoment.tz(zone)
        let zoneOffset = zoneObj.offset(nowMoment)

        if (!zoneObj.canonicalName) {
          zoneObj.canonicalName = zoneObj.name
        }

        zoneObj.saved = savedCities.indexOf(zone) > -1
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

    return {
      zones,
      cityFilter: ''
    }

    function plurals(num) {
      return num === 1 ? '' : 's'
    }
  },
  computed: {
    filteredZones: function () {
      if (!this.cityFilter.trim()) return this.zones

      return this.zones.filter(zone => {
        return zone.name.toLowerCase().indexOf(this.cityFilter) > -1
      })
    }
  }
}
</script>
