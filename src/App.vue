<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import { mapState } from 'vuex'

export default {
  name: "App",
  components: { Header },
  beforeCreate: function() {
    if (window.localStorage.getItem("darkApp")) {
      let convertedVal = JSON.parse(window.localStorage.getItem("darkApp"))
      this.$store.dispatch("commitSetDarkMode", convertedVal)
      
    } else {
      window.localStorage.setItem("darkApp", "false")
    }
  },
  created: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let currentKey = localStorage.key(i);
      let currentValue = localStorage.getItem(currentKey);
      if (currentKey.includes("World-")) {
        this.$store.dispatch('commitNewWorld',JSON.parse(currentValue));
      }
    }
    this.$vuetify.theme.dark = this.$store.state.isDark;
  },
  computed: mapState(['isDark']),
  watch: {
    isDark: function( value ) {
      this.$vuetify.theme.dark = value;
    }
  }
};
</script>
