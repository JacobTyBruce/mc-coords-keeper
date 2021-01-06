<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
const remote = require('electron').remote;
console.log(remote.app.getAppPath())

export default {
  name: "App",
  components: { Header },
  // below hooks are for setting data from storage locations depending on the environment being used -- web vs electron
  beforeCreate: function () {
    this.$vuetify.theme.dark = this.$store.state.isDark;
    console.log(this.$static)
  },
};
</script>

<style>
* {
  font-family: Roboto !important;
}
</style>>
