<template ref="header">
  <v-app-bar app color="primary">
    <v-btn to="/" text color="white" title height="50" active-class="no-bg">
      <v-avatar height="50" left>
        <img
          src="https://www.vhv.rs/dpng/d/439-4398043_bee-minecraft-piglin-hd-png-download.png"
          alt="alt"
        />
      </v-avatar>
      <v-divider vertical class="mx-2"></v-divider>
      <h1>{{appName}}</h1>
    </v-btn>
    <!-- Spacer -->
    <v-spacer></v-spacer>
    <ImportWorld />
    <!-- Add World -->
    <v-menu v-model="dialog" max-width="290" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn color="error" right v-on="on">Add World</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add World</v-card-title>
        <v-form max-width="80%">
          <v-container>
            <v-row>
              <v-col justify-space-around>
                <v-text-field label="World Name" v-model="worldName"></v-text-field>
                <v-text-field label="Description" v-model="worldDesc"></v-text-field>
                <v-file-input label="Upload Image" v-model="worldImg" prepend-icon="mdi-image"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false; addWorld()">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-btn icon to="/settings">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style>
.no-bg::before {
  background: none !important;
}
</style>

<script>
import ImportWorld from "./ImportWorld.vue";

export default {
  name: "Header",
  components: { ImportWorld },
  data: function () {
    return {
      dialog: false,
      worldName: "",
      worldDesc: "",
      worldImg: null,
      appName: "MC Coordinate Keeper",
    };
  },
  methods: {
    addWorld: function () {
      // init vars
      let worldName = this.worldName;
      let worldDesc = this.worldDesc;
      let worldImage;
      
      if (this.worldImg != null) {
        worldImage = this.worldImg
        console.log(worldImage)
      } else {
        let newCreatedImg = new Image(500, 500).src=".../public/Grass_Block.png";
        console.log(newCreatedImg)
        worldImage = newCreatedImg;
        console.log(worldImage)
      }

      // convert image to data uri
      function readFile() {
        const fr = new FileReader();

        return new Promise((resolve, reject) => {
          fr.readAsDataURL(worldImage);
          fr.onerror = () => {
            fr.abort();
            reject(new DOMException("Problem parsing input file."));
          };

          fr.onload = () => {
            resolve(fr.result);
          };
        }).then((value) => {
          worldImage = value;
      })}

       (async () =>  {
        console.log("Waiting for image - current state: " + worldImage + "Type: " + typeof worldImage)
        await readFile();
        console.log("Called for image - current state: " + worldImage + "Type: " + typeof worldImage)
          // create JSON obj
          let jsonWorld = JSON.stringify({
            name: worldName,
            desc: worldDesc,
            img: worldImage,
            coords: [],
          });
          // set to localStorage, make if/else for electron/web later on
          window.localStorage.setItem("World-" + worldName, jsonWorld);

          // add to Vuex/local file
          // non-JSON obj
          let nonJsonWorld = {
            name: worldName,
            desc: worldDesc,
            img: worldImage,
            coords: [],
          };

          this.$store.dispatch("commitNewWorld", nonJsonWorld);
          
          // update current world
          this.$store.dispatch("commitCurrentWorld", nonJsonWorld);
          // push to new world
          this.$router.push("/" + worldName);

      worldName = null;
      worldDesc = null;
      worldImage = null;
    })()
    },
  },
};
</script>