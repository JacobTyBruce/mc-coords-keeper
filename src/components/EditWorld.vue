<template>
  <v-dialog v-model="dialog" persistent max-width="25%" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="orange" depressed v-on="on" medium>
        <v-icon medium left>mdi-pencil-outline</v-icon>Edit World
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit World</v-card-title>
      <v-card-subtitle>{{currentWorld.name}}</v-card-subtitle>
      <v-card-subtitle v-if="currentWorld.desc === 0">No Description</v-card-subtitle>
      <v-card-subtitle>{{currentWorld.desc}}</v-card-subtitle>
      <v-card-subtitle>{{currentWorld.img}}</v-card-subtitle>

      <v-form max-width="80%">
        <v-container>
          <v-row>
            <v-col justify-space-around>
              <v-text-field type="text" single-line label="New Name" v-model="newName"></v-text-field>
              <v-text-field type="text" single-line label="New Description" v-model="newDesc"></v-text-field>
              <v-text-field type="text" single-line label="New Image" v-model="newImg"></v-text-field>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "EditWorld",
  data: function () {
    return {
      dialog: false,
      newName: null,
      newDesc: null,
      newImg: null,
    };
  },
  methods: {
    ...mapActions({
      editLocation: "commitEditWorld",
    })
  },
  computed: {
    ...mapState(["currentWorld"]),
  },
};
</script>