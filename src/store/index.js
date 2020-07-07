import Vue from 'vue'
import Vuex from 'vuex'
//import * as worldsConfig from "../assets/coords.json";
//const {worlds} = worldsConfig;

Vue.use(Vuex)

var worldsArray = []
for (var i = 0; i < localStorage.length; i++){
  let currentKey = localStorage.key(i);
  let currentValue = localStorage.getItem(currentKey);
  if (currentKey.includes('World-')) {
    worldsArray.push(JSON.parse(currentValue));
  }
}

export default new Vuex.Store({
  state: {
    worldsList: worldsArray,
    currentWorld: {}
  },
  mutations: {
    setCurrentWorld: (state, selection) => {
      state.currentWorld = selection
    }
  },
  actions: {
    commitCurrentWorld: (context, payload) => {
      context.commit("setCurrentWorld" , payload)
    }
  },
  modules: {
  }
})