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
    isDark: false
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
    },
    setOppDark: (state) => {
      state.isDark = !state.isDark;
    },
    setDarkMode: (state, darkSetting) => {
      state.isDark = darkSetting;
    }
  },
  actions: {
    commitCurrentWorld: (context, payload) => {
      context.commit("setCurrentWorld" , payload);
    },
    commitNewWorld: (context, world) => {
      context.commit("addWorld", world);
    },
    commitNewLocation: (context, location) => {
      context.commit("addLocation", location);
    },
    commitOppDarkMode: (context) => {
      context.commit("setOppDark");
      let currentDarkVal = JSON.parse(window.localStorage.getItem("darkApp"));
      let oppDarkVal = !currentDarkVal;
      window.localStorage.setItem("darkApp", JSON.stringify(oppDarkVal))
    },
    commitSetDarkMode: (context, darkSetting) => {
      context.commit("setDarkMode", darkSetting);
    }
  },
  modules: {
  }
})