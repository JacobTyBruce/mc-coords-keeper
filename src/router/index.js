import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WorldView from '../views/WorldView.vue'
import Settings from '../views/Settings.vue'
//import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/:world',
    name: 'WorldView',
    component: WorldView,
    props: true,
    // beforeEnter: (to, from, next) => {
    //   // checks if currentWorld object has name prop
    //   if (!(Object.prototype.hasOwnProperty.call(store.state.currentWorld, 'name'))) {
    //     console.log('State Empty')
    //     var world = to.params.world // world name
    //     console.log(world)
    //     var match = null
    //     // try to match in worldsList
    //     // need to find way to wait for state to be populated
    //     // move to incomponent so state loads first
    //     store.state.worldsList.forEach((stateWorld) => {
    //       console.log('New World: '+stateWorld.name)
    //       if (stateWorld.name == world) { match = stateWorld }
    //     })
    //     console.log('Ended')
    //     if (match != null) {store.dispatch('commmitCurrentWorld', match)}
    //     else {next({path: '/'})}
    //     next()
    //   } else {
    //     console.log('State populated')
    //     next()
    //   }
    // }
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
