<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">Choose World</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" three-line>
              <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
              <v-list-item-subtitle>{{item.desc}}</v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-btn :to="{name:WorldView, params: {world: item}}" router>View Coords</v-btn>
              </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import * as worldsConfig from "./assets/coords.json";
// set inner world obj to variable 'worlds'
const {worlds} = worldsConfig;
// can access worlds from inner array by using 'worlds[x]'

console.log(worlds)
console.log(worlds[1])

export default {
  name: "App",
  components: { Header },
  data: function() {
    return {
      items: [
      { title: 1, desc: 'desc1', routeTo: '/world1' },
      { title: 2, desc: 'desc2', routeTo: '/world2' },
      { title: 3, desc: 'desc3', routeTo: '/world3' },
      { title: 4, desc: 'desc4', routeTo: '/world4' },
      ]
    };
  }
};
</script>
