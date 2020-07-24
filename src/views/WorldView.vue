<template>
  <v-main :key="reloadKey" v-on:update-reload="reloadKey += 1">
    <v-btn color="success" to="/">
      <v-icon mr-2>mdi-arrow-left-bold-outline</v-icon>Back
    </v-btn>
    <v-container>
      <v-row>
        <v-col>
          <v-avatar color="white" size="100" tile>
            <img
              :src='this.$store.state.defaultImg'
              alt="alt"
            />
          </v-avatar>
        </v-col>
        <v-col>
          <h1>{{this.$store.state.currentWorld.name}}</h1>
          <p>{{this.$store.state.currentWorld.desc}}</p>
        </v-col>
        <v-col>
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
                    <v-col cols="6">
                      <v-card-title>{{item.name}}</v-card-title>
                      <v-card-subtitle>
                        X:<b>{{item.x}}</b>
                        Y:<b>{{item.y}}</b>
                        Z: <b>{{item.z}}</b>
                      </v-card-subtitle>
                    </v-col>
                    <v-col cols="6">
                      <EditCoords v-bind:location="item" />
                      <DeleteCoords v-bind:location="item" />
                    </v-col>
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
    </v-container>
  </v-main>
</template>

<script>
import AddCoords from "../components/AddCoords.vue";
import DeleteWorld from "../components/DeleteWorld.vue"
import EditCoords from "../components/EditCoords.vue"
import DeleteCoords from "../components/DeleteCoords"

export default {
  name: "WorldView",
  props: ["world"],
  components: { AddCoords, DeleteWorld, EditCoords, DeleteCoords },
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
  }
};
</script>