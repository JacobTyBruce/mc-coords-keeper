<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header },
  mounted: function() {
    console.log(this.$refs);
  },
  created: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let currentKey = localStorage.key(i);
      let currentValue = localStorage.getItem(currentKey);
      if (currentKey.includes("World-")) {
        this.$store.state.worldsList.push(JSON.parse(currentValue));
      }
    }
  }
};
</script>
