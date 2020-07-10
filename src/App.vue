<template>
  <v-app :dark="this.$store.state.isDark">
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header },
  created: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let currentKey = localStorage.key(i);
      let currentValue = localStorage.getItem(currentKey);
      if (currentKey.includes("World-")) {
        this.$store.state.worldsList.push(JSON.parse(currentValue));
      }
    }
    this.$vuetify.dark = true
  }
};
</script>
