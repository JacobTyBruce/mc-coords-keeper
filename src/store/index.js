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
    isDark: false,
    defaultImg: 'https://vignette.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest?cb=20190903234415',
  },
  mutations: {
    setCurrentWorld: (state, selection) => {
      state.currentWorld = selection;
    },
    addWorld: (state, world) => {
      state.worldsList.push(world);
    },
    deleteWorld: (state, world) => {
      //state.worldsList = state.worldsList.filter( item => {item.name != world.name} );
      let filtered = [];
      let toDelete = {}
      state.worldsList.forEach( item => { if(item.name != world.name) {filtered.push(item)} else {toDelete = item} } );
      state.worldsList = filtered;
      window.localStorage.removeItem("World-"+toDelete.name)
      state.currentWorld = {};
    },
    addLocation: (state, location) => {
      state.currentWorld.coords.push(location);
    },
    editLocation: (state, location) => {
      // current world coords array
      let currentLocations = state.currentWorld.coords;
      // new coords object name
      let newLocationName = location.name;
    },
    deleteLocation: (state, location) => {
      let world = state.currentWorld
      let filtered = [];
      world.coords.forEach( item => { if(item.name != location.name) {filtered.push(item)} } );
      // session
      world.coords = filtered
      // LS
      let lsItem = JSON.parse(window.localStorage.getItem("World-"+world.name))
      lsItem.coords = filtered
      window.localStorage.setItem("World-"+world.name, JSON.stringify(lsItem))
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
    commitDeleteWorld: (context, world) => {
      context.commit("deleteWorld", world)
    },
    commitNewLocation: (context, location) => {
      context.commit("addLocation", location);
    },
    commitEditLocation: (context, location) => {
      context.commit("editLocation", location)
    },
    commitDeleteLocation: (context, location) => {
      context.commit("deleteLocation", location)
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