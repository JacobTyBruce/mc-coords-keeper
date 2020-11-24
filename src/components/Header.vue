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
        <v-card-text> NOTE: Adding a world with the same name as an existing world will cause it to override the existing one </v-card-text>
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
    async addWorld() {
      // init vars
      let worldName = this.worldName;
      let worldDesc = this.worldDesc;
      let worldImage = this.worldImg;
      // convert function
      function convertToDataUrl(image) {
        if (image != null) {
          return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = error => reject(error);
            fr.onload = res => resolve(res.target.result)
            fr.readAsDataURL(image)
          }) 
        } else {
          let image = new Image();
          image.src = "https://assets.codepen.io/1438993/small-axe.png";
          image.setAttribute("crossorigin", "anonymous")
          console.log(image.width)
          image.onload = async () => {
            let canvas = document.createElement("canvas")
            canvas.width = '100px'
            canvas.height = '100px'
            let context = canvas.getContext("2d")
            context.drawImage(image, 0, 0)
            worldImage = canvas.toDataURL()
            console.log(worldImage)
          }
        }
      }
      // convert image to data uri
      if (worldImage === null || worldImage === undefined) {
        var blobReq = await fetch("https://assets.codepen.io/1438993/small-axe.png")
        console.log(blobReq)
        let blob = await blobReq.blob()
        console.log(blob)
        worldImage = await convertToDataUrl(blob)
        //worldImage = await convertToDataUrl(null)
        console.log(worldImage)
        console.log('Done processing default image')
      } else {
        console.log('Image provided')
        console.log(worldImage)
        worldImage = await convertToDataUrl(worldImage);
        console.log('Done proccessing provided image')
      }
        console.log('Done with images')
        // non-JSON world
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

        this.worldName = "";
        this.worldDesc = "";
        this.worldImg = null;
    },
  },
};
</script>