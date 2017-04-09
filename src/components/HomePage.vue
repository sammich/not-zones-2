<template>
  <div class="sam-view">
    <list-item v-for="city in savedCities" hover="true">
      <div slot="left">
        <span class="reset-select">{{city.name}}</span>
      </div>
      <div slot="right">
        <span class="reset-select">{{city.offsetDisplay}}</span>
      </div>
    </list-item>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ListItem from './ListItem'

export default {
  name: 'zones',
  computed: mapGetters({
    savedCities: 'savedCities'
  }),
  data() {
    return {
      title: 'Your Zones'
    }
  },
  components: { ListItem }
}
</script>

<style scoped>

</style>
