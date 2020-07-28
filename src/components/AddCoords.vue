<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="25%">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">Add Location</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add Location</v-card-title>
        <v-form max-width="80%">
          <v-container>
            <v-row>
              <v-col justify-space-around>
                <v-text-field label="Location Name" v-model="locationName" :rules="['Required']"></v-text-field>
                <v-text-field type="number" single-line label="X" v-model="x" :rules="['Required']"></v-text-field>
                <v-text-field type="number" single-line label="Y" v-model="y" :rules="['Required']"></v-text-field>
                <v-text-field type="number" single-line label="Z" v-model="z" :rules="['Required']"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false; addLocation(locationName, x, y, z)"
          >Add</v-btn>
        </v-card-actions>
        </v-form>
        
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AddCoords",
  data: function() {
    return {
      dialog: false,
      locationName: "",
      x: "",
      y: "",
      z: "",
    };
  },
  methods: {
      addLocation: function(name, x, y, z) {
        // add location to array
        let newLocation = {name: name, x: parseInt(x),y: parseInt(y), z: parseInt(z)};
        // clear data
        this.locationName = "";
        this.x = null;
        this.y = null;
        this.z = null;
        
        // append location to world object -- dispatch action
        this.$store.dispatch("commitNewLocation", newLocation);

        // commit to localStorage - match key in local sotrage with currentWorld name -- grab object in currentWorld and override value in lS?
        let currentWorldName = this.$store.state.currentWorld.name;
        for (let i = 0; i < localStorage.length; i++) {
            let currentKey = localStorage.key(i);
            let currentValue = localStorage.getItem(currentKey);
            if (currentKey.includes(currentWorldName)) {
                let newValue = JSON.parse(currentValue);
                newValue.coords.push(newLocation);
                window.localStorage.setItem(currentKey, JSON.stringify(newValue));
            }
        }
        // refresh
        this.$emit("update-reload")
    }   
  }
};
</script>