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

export {worldStorage, userSettings}

// for all operations that require saving to different locations depending on location, 
// maybe make one source of truth inside each function with a variable so that no
// data gets set different from eahc other in case of error or faulty programming in future
// as seen with dark mode bug in previous version

export default new Vuex.Store({
  state: {
    worldsList: [],
    currentWorld: {},
    isDark: false,
    defaultImg: 'https://vignette.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest?cb=20190903234415',
    isElectron: process.env.IS_ELECTRON,
  },
  mutations: {
    setCurrentWorld: (state, selection) => {
      state.currentWorld = selection;
    },
    addWorld: (state, world) => {
      state.worldsList.push(world);
      worldStorage.set(world.name, world)
      if (!state.isElectron) {
        window.localStorage.setItem('World-'+world.name, JSON.stringify(world))
      }
    },
    deleteWorld: (state, world) => {
      let filtered = [];
      let toDelete = {}
      state.worldsList.forEach( item => { if(item.name != world.name) {filtered.push(item)} else {toDelete = item} } );
      state.worldsList = filtered;
      if (!state.isElectron) {
        window.localStorage.removeItem("World-"+toDelete.name)
      }
      state.currentWorld = {};
      worldStorage.delete(world.name)
    },
    editWorld: async (state, newWorld) => {
      let localStorageKey = 'World-'+state.currentWorld.name;
      // Ls obj
      let localObj = window.localStorage.getItem(localStorageKey)
      localObj;
      // set in LS
      if (!state.isElectron) {
        window.localStorage.setItem('World-'+newWorld.name, JSON.stringify(newWorld))
        window.localStorage.removeItem('World-'+state.currentWorld.name)
      }
      // set in Local file
      worldStorage.delete(state.currentWorld.name)
      worldStorage.set(newWorld.name, newWorld)
      // set in mem/store
      // change currentWorld first to update UI
      console.log(newWorld)
      // get index of current world in worldsList array to change
      var preWorld = state.worldsList.indexOf(state.worldsList.find(function(item) {console.log(item.name, state.currentWorld.name);if (item.name == state.currentWorld.name) {return item}}))
      state.worldsList[preWorld] = newWorld
      // update currentWorld to update UI
      state.currentWorld = newWorld
    },
    addLocation: (state, location) => {
      state.currentWorld.coords.push(location);
      if (!state.isElectron) {
        let lsObj = JSON.parse(window.localStorage.getItem('World-'+state.currentWorld.name));
        lsObj.coords.push(location)
        window.localStorage.setItem('World-'+state.currentWorld.name, JSON.stringify(lsObj))
      }
      let currentObj = worldStorage.get(state.currentWorld.name) 
      currentObj.coords.push(location)
      worldStorage.set(state.currentWorld.name, currentObj)
    },
    editLocation: (state, location) => {
      // variables
      // current world in LS
      if (!state.isElectron) {
        // key to get LS value
        let localStorageKey = "World-" + state.currentWorld.name;
        console.log('Key = '+localStorageKey)
        let currentLocalLocations = window.localStorage.getItem(localStorageKey)
        // editing LS data
        currentLocalLocations.coords.forEach(locationObj => {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
      window.localStorage.setItem(localStorageKey, JSON.stringify(currentLocalLocations))
      }
      // current world coords array in State
      let currentStateLocations = state.currentWorld.coords;
      // current worlds coords array in electron-store
      let currentLocalWorld = worldStorage.get(state.currentWorld.name);
      console.log(currentLocalWorld)
      // iterate over each obj in coords array, then match and change coords when found
      currentStateLocations.forEach(function(locationObj) {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
      // edit storage data
      currentLocalWorld.coords.forEach(locationObj => {
        if (locationObj.name == location.name) {
          locationObj.x = location.x
          locationObj.y = location.y
          locationObj.z = location.z
        }
      })
      worldStorage.set(state.currentWorld.name, currentLocalWorld)
    },
    deleteLocation: (state, location) => {
      let world = state.currentWorld
      let filtered = [];
      world.coords.forEach( item => { if(item.name != location.name) {filtered.push(item)} } );
      // session
      world.coords = filtered
      // LS
      if (!state.isElectron) {
        let lsItem = JSON.parse(window.localStorage.getItem("World-"+world.name))
        lsItem.coords = filtered
        window.localStorage.setItem("World-"+world.name, JSON.stringify(lsItem))
      }
      // storage
      let storageItem = worldStorage.get(state.currentWorld.name)
      storageItem.coords = filtered
      worldStorage.set(state.currentWorld.name, storageItem)
    },
    setOppDark: (state) => {
      // state switch
      state.isDark = !state.isDark;
      
      if (!state.isElectron) {
        window.localStorage.setItem("darkApp", JSON.stringify(oppDarkVal))
        // LS switch
        let currentDarkVal = JSON.parse(window.localStorage.getItem("darkApp"));
        let oppDarkVal = !currentDarkVal;
      }
      // app data switch
      let currentAppDark = userSettings.get('darkMode')
      userSettings.set('darkMode', !currentAppDark)
    },
    setDarkMode: (state, darkSetting) => {
      state.isDark = darkSetting;
      userSettings.set('darkMode', state.isDark)
      if (!state.isElectron) {window.localStorage.setItem('darkApp', state.isDark)}
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
    commitEditWorld: (context, world) => {
      context.commit('editWorld', world)
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
    },
    commitSetDarkMode: (context, darkSetting) => {
      context.commit("setDarkMode", darkSetting);
    }
  },
  modules: {
  }
})