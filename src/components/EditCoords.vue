<template>
  <v-dialog v-model="dialog" persistent max-width="25%" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="orange" depressed outlined small v-on="on">Edit</v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Location</v-card-title>
      <v-card-subtitle>{{this.location.name}}</v-card-subtitle>
      <v-form max-width="80%">
        <v-container>
          <v-row>
            <v-col justify-space-around>
              <v-text-field type="number" single-line label="New X" v-model="newX" ></v-text-field>
              <v-text-field type="number" single-line label="New Y" v-model="newY" ></v-text-field>
              <v-text-field type="number" single-line label="New Z" v-model="newZ" ></v-text-field>
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
import { mapActions } from "vuex";

export default {
  name: "EditCoords",
  props: ["location"],
  data: function () {
    return {
      dialog: false,
      newX: null,
      newY: null,
      newZ: null,
    };
  },
  methods: {
    ...mapActions({
      editLocation: "commitEditLocation",
    }),
    newLocationObj(newX, newY, newZ) {
        let newLocation = {name: this.location.name, x: newX, y: newY, z: newZ}
        this.editLocation(newLocation)
    },
  },
};
</script>