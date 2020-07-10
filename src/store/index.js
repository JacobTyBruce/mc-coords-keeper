import Vue from 'vue'
import Vuex from 'vuex'
//import * as worldsConfig from "../assets/coords.json";
//const {worlds} = worldsConfig;

Vue.use(Vuex)

/* var worldsArray = []
for (let i = 0; i < localStorage.length; i++){
  let currentKey = localStorage.key(i);
  let currentValue = localStorage.getItem(currentKey);
  if (currentKey.includes('World-')) {
    worldsArray.push(JSON.parse(currentValue));
  }
}
*/

export default new Vuex.Store({
  state: {
    worldsList: [],
    currentWorld: {},
    isDark: true
  },
  mutations: {
    setCurrentWorld: (state, selection) => {
      state.currentWorld = selection;
    },
    addWorld: (state, world) => {
      state.worldsList.push(world);
    },
    addLocation: (state, location) => {
      state.currentWorld.coords.push(location);
    }
  },
  actions: {
    commitCurrentWorld: (context, payload) => {
      context.commit("setCurrentWorld" , payload)
    },
    commitNewWorld: (context, world) => {
      context.commit("addWorld", world)
    },
    commitNewLocation: (context, location) => {
      context.commit("addLocation", location)
    }
  },
  modules: {
  }
})