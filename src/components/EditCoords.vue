<template>
  <v-dialog v-model="dialog" persistent max-width="25%" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="orange" depressed outlined v-on="on" medium><v-icon dark medium left>mdi-wrench</v-icon>Edit</v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Location</v-card-title>
      <v-card-subtitle>{{this.location.name}}</v-card-subtitle>
      <v-form max-width="80%">
        <v-container>
          <v-row>
            <v-col justify-space-around>
              <v-text-field type="number" single-line label="New X" v-model="newX" :rules="coordRules"></v-text-field>
              <v-text-field type="number" single-line label="New Y" v-model="newY" :rules="yCoordRules"></v-text-field>
              <v-text-field type="number" single-line label="New Z" v-model="newZ" :rules="coordRules"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false; newLocationObj(newX, newY, newZ)"
          >Edit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditCoords",
  props: ["location"],
  data: function () {
    return {
      dialog: false,
      newX: null,
      newY: null,
      newZ: null,
      nameRules: [
        val => !!val || 'Please enter a name!'
      ],
      yCoordRules: [
        val => !!val || 'Please enter a value!',
        val => val <= 256 || 'Max height is 256!'
      ],
      coordRules: [
        val => !!val || 'Please enter a value!',
        val => val <= 29999984 || 'Outside world border!'
      ]
    };
  },
  methods: {
    newLocationObj(newX, newY, newZ) {
        let newLocation = {name: this.location.name, x: newX, y: newY, z: newZ}
        this.$store.dispatch("commitEditLocation", newLocation)
    },
  },
};
</script>