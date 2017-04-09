import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Settings from '@/components/SettingsPage'
import AddCity from '@/components/AddCityPage'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/settings',
      name: 'settings',
      index: 1,
      component: Settings,
      meta: {
        name: 'Your Settings'
      }
    }, {
      path: '/home',
      name: 'home',
      index: 2,
      component: Home,
      meta: {
        name: 'Your Zones'
      }
    }, {
      path: '/add',
      name: 'add',
      index: 3,
      component: AddCity,
      meta: {
        name: 'Add City'
      }
    }
  ]
})
