<template>
  <div class="sam-view">
    <list-item>
      <div slot="left">Current theme</div>
      <div slot="right">
        <select v-model="selectedTheme">
          <option disabled value="">- select a theme -</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
        </select>

      </div>
    </list-item>

    <list-item>
      <div slot="left">Show Country</div>
      <div slot="right">{{ showCountry ? 'yes' : 'no' }}</div>
    </list-item>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from './ListItem'

export default {
  name: 'settings',
  computed: mapGetters({
    showCountry: 'showCountryPref'
  }),
  methods: {

  },
  watch: {
    selectedTheme: function (a, b) {
      console.log(this, this.selectedTheme)
      this.$store.dispatch('updateThemePreference', this.selectedTheme)
    }
  },
  data() {
    return {
      title: 'Your Settings',
      selectedTheme: this.$store.getters.theme
    }
  },
  components: { ListItem }
}
</script>

<style scoped>

</style>
