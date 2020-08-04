<template ref="header">
  <v-app-bar app color="primary" >
    <v-btn to="/" text color="white">
    <v-avatar size="50">
      <img
        src="https://www.vhv.rs/dpng/d/439-4398043_bee-minecraft-piglin-hd-png-download.png"
        alt="alt"
      />
    </v-avatar>
    <v-divider vertical></v-divider>
    <h1>{{appName}}</h1>
    </v-btn>
    <!-- Spacer -->
    <v-spacer></v-spacer>
    
    <!-- Add World -->
    <v-menu v-model="dialog" max-width="290" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn color="error" right v-on="on">Add World</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add World</v-card-title>
        <v-form max-width="80%">
          <v-container>
            <v-row>
              <v-col justify-space-around>
                <v-text-field label="World Name" v-model="worldName"></v-text-field>
                <v-text-field label="Description" v-model="worldDesc"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false; addWorld()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-btn icon to="/settings">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
//const storage = require('electron-json-storage');
//console.log(storage.getDefaultDataPath())

export default {
  name: "Header",
  data: function() {
    return {
      dialog: false,
      worldName: "",
      worldDesc: "",
      appName: "MC Coordinate Keeper",
    };
  },
  methods: {
    addWorld: function() {
      // init vars
      let worldName = this.worldName;
      let worldDesc = this.worldDesc;
      // JSON obj
      let jsonWorld = JSON.stringify({
        name: worldName,
        desc: worldDesc,
        coords: []
      });
      window.localStorage.setItem("World-" + worldName, jsonWorld);
      // add to Vuex
      // non-JSON obj
      let nonJsonWorld = { name: worldName, desc: worldDesc, coords: [] };
      this.$store.dispatch("commitNewWorld", nonJsonWorld);
      // update current world
      this.$store.dispatch("commitCurrentWorld", nonJsonWorld);
      // push to new world
      this.$router.push("/" + worldName);
    }
  },
};
</script>