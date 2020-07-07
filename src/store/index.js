import Vue from 'vue'
import Vuex from 'vuex'
import * as worldsConfig from "../assets/coords.json";
const {worlds} = worldsConfig;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worldsList: worlds,
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