import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// setup store
const Storage = window.require('electron-store');
// worlds schema

const schema = {
  world: {
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "desc": {"type": "string"},
      "coords": {"type": "array"}
    }
  }
}
// declare world storage
const worldStorage = new Storage({schema: schema, name: 'worlds'})

// declare User Settings Storage
const userSettings = new Storage({name: 'user-settings'})

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
      worldStorage.set(world.name, world)
    },
    deleteWorld: (state, world) => {
      let filtered = [];
      let toDelete = {}
      state.worldsList.forEach( item => { if(item.name != world.name) {filtered.push(item)} else {toDelete = item} } );
      state.worldsList = filtered;
      window.localStorage.removeItem("World-"+toDelete.name)
      state.currentWorld = {};
      worldStorage.delete(world.name)
    },
    addLocation: (state, location) => {
      state.currentWorld.coords.push(location);
      let currentObj = worldStorage.get(state.currentWorld.name) 
      currentObj.coords.push(location)
    },
    editLocation: (state, location) => {
      // variables
      let localStorageKey = "World-" + state.currentWorld.name;
      // current world coords array in State
      let currentStateLocations = state.currentWorld.coords;
      // current worlds coords array in LS
      let currentLocalLocations = JSON.parse(window.localStorage.getItem(localStorageKey));
      // editing current session data
      // iterate over each obj in coords array, then match and change coords when found
      currentStateLocations.forEach(function(locationObj) {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
      // editing LS data
      currentLocalLocations.coords.forEach(locationObj => {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
      window.localStorage.setItem(localStorageKey, JSON.stringify(currentLocalLocations))
      // edit storage data
      worldStorage.get(state.currentWorld.name).coords.forEach(locationObj => {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
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
      // storage
      let storageItem = worldStorage.get(state.currentWorld.name)
      storageItem.coords = filtered
    },
    setOppDark: (state) => {
      state.isDark = !state.isDark;
      userSettings.set('dark', !state.isDark)
    },
    setDarkMode: (state, darkSetting) => {
      state.isDark = darkSetting;
      userSettings.set('dark', state.isDark)
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