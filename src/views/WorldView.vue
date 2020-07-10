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
              src="https://vignette.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest?cb=20190903234415"
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
        <v-col>
          <v-list text-center>
            <v-list-item
              v-for="(item, index) in this.$store.state.currentWorld.coords"
              :key="'coord' + index"
            >
              <v-card flat>
                <v-card-title>{{item.name}}</v-card-title>
                <v-card-subtitle>
                  X:
                  <b>{{item.x}}</b> Y:
                  <b>{{item.y}}</b> Z:
                  <b>{{item.z}}</b>
                </v-card-subtitle>
              </v-card>
              
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AddCoords from "../components/AddCoords.vue";

export default {
  name: "WorldView",
  props: ["world"],
  components: { AddCoords },
  data: function() {
      return {
          reloadKey: 0
      }
  }
};
</script>