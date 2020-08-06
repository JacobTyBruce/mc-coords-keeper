<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import { mapState } from "vuex";
import { worldStorage, userSettings } from "./store/index.js";

export default {
  name: "App",
  components: { Header },
  // below hooks are for setting data from storage locations depending on the environment being used -- web vs electron
  beforeCreate: function () {
    // set dark mode
    if (!process.env.IS_ELECTRON) {
      if (window.localStorage.getItem("darkApp")) {
        let convertedVal = JSON.parse(window.localStorage.getItem("darkApp"));
        this.$store.dispatch("commitSetDarkMode", convertedVal);
      } else {
        window.localStorage.setItem("darkApp", "false");
      }
    } else {
      if (userSettings.has("darkMode")) {
        this.$store.dispatch("commitSetDarkMode", userSettings.get("darkMode"));
      } else {
        this.$store.dispatch("commitSetDarkMode", false);
        userSettings.set("darkMode", false)
      }
    }
    this.$vuetify.theme.dark = this.$store.state.isDark;
  },
  created: function () {
    // get localStorage values to put into state -- for web
    if (!process.env.IS_ELECTRON) {
      for (let i = 0; i < localStorage.length; i++) {
        let currentKey = localStorage.key(i);
        let currentValue = localStorage.getItem(currentKey);
        if (currentKey.includes("World-")) {
          this.$store.dispatch("commitNewWorld", JSON.parse(currentValue));
        }
      }
    } else {
      // get storage values to put into state -- for desktop
      Object.values(worldStorage.store).forEach((value) => {
        this.$store.dispatch("commitNewWorld", value);
      });
    }
  },
  // not working?
  computed: mapState(["isDark"]),
  watch: {
    isDark: function (value) {
      this.$vuetify.theme.dark = value;
    },
  },
};
</script>
