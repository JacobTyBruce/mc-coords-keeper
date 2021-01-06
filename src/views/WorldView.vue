<template>
  <v-main :key="reloadKey" v-on:update-reload="reloadKey += 1">
    <v-btn color="success" to="/" class='ma-4'>
      <v-icon mr-2>mdi-arrow-left-bold-outline</v-icon>Back
    </v-btn>
    <v-container>
      <v-row>
        <v-col>
          <v-avatar color="white" size="100" tile>
            <v-img
              :src='this.$store.state.currentWorld.img'
              alt="World Image"
            />
          </v-avatar>
        </v-col>
        <v-col>
          <h1>{{this.$store.state.currentWorld.name}}</h1>
          <p>{{this.$store.state.currentWorld.desc}}</p>
        </v-col>
        <v-col class='text-center'>
          <EditWorld />
          <AddCoords />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list text-center>
            <v-list-item
              v-for="(item, index) in this.$store.state.currentWorld.coords"
              :key="'coord' + index"
            >
              <v-card flat width="100%">
                <v-container>
                  <v-row>
                    <v-col cols="8">
                      <v-card-title>{{item.name}}</v-card-title>
                      <v-card-subtitle>
                        X:<b>{{item.x}}</b>
                        Y:<b>{{item.y}}</b>
                        Z: <b>{{item.z}}</b>
                      </v-card-subtitle>
                    </v-col>
                    <v-col cols="2" align-self="center">
                      <EditCoords v-bind:location="item" />
                    </v-col>
                    <v-col cols="2" align-self="center">
                      <DeleteCoords v-bind:location="item" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-divider></v-divider>
                  </v-row>
                </v-container>
              </v-card>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DeleteWorld />
        </v-col>
      </v-row>
      <v-row>
        <ExportWorld />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AddCoords from "../components/AddCoords.vue";
import DeleteWorld from "../components/DeleteWorld.vue"
import EditCoords from "../components/EditCoords.vue"
import DeleteCoords from "../components/DeleteCoords.vue"
import ExportWorld from "../components/ExportWorld.vue"
import EditWorld from "../components/EditWorld.vue"
import store from "../store"

export default {
  name: "WorldView",
  props: ["world"],
  components: { AddCoords, DeleteWorld, EditCoords, DeleteCoords, ExportWorld, EditWorld },
  data: function() {
    return {
      reloadKey: 0,
    };
  },
  beforeCreate: function() {
    if (this.$store.state.currentWorld == {}) {
      this.$router.push('/')
    } else {
      return
    }
  },
  beforeRouteEnter: (to, from, next) => {
    console.log('In Component')
    console.log(store)
    console.log(to)
      if (!(Object.prototype.hasOwnProperty.call(store.state.currentWorld, 'name'))) {
      console.log('State Empty')
      var world = to.params.world // world name
      console.log(world)
      var match = null
      // try to match in worldsList
      // need to find way to wait for state to be populated
      // move to incomponent so state loads first
      store.state.worldsList.forEach((stateWorld) => {
        console.log('New World: '+stateWorld.name)
        if (stateWorld.name == world) { match = stateWorld }
      })
      console.log('Ended')
      if (match != null) {store.dispatch('commitCurrentWorld', match)}
      else {next({path: '/'})}
      next()
    } else {
      console.log('State populated')
      next()
    }
  }
};
</script>