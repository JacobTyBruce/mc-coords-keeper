<template>
  <v-app>
    <Header />
    <router-view />
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
};
</script>
