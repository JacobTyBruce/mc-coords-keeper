<template ref="header">
  <v-app-bar app color="primary">
    <v-btn to="/" text color="white" title height="50" active-class="no-bg">
      <v-avatar height="50" left>
        <img
          :src='imageSrc'
          alt="Icon"
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
        <v-form max-width="80%" ref="form">
          <v-container>
            <v-row>
              <v-col justify-space-around>
                <v-text-field label="World Name" v-model="worldName" :rules="nameRules"></v-text-field>
                <v-text-field label="Description" v-model="worldDesc"></v-text-field>
                <v-file-input label="Upload Image" v-model="worldImg" prepend-icon="mdi-image"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="validate()">Add</v-btn>
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
      imageSrc: 'data:image/png;base64,' + this.$fs.readFileSync(this.$static + '/icon.png', {encoding: 'base64'}),
      worldName: null,
      worldDesc: "",
      worldImg: null,
      appName: "MC Coordinate Keeper",
      nameRules: [
        v => !!v || 'You must enter a world name!',
        v => (v && v.length <= 50) || 'Name must be 50 or less characters!',
      ]
    };
  },
  watch: {
    dialog(newVal) {
      if (newVal == false) { this.$refs.form.reset() }
    }
  },
  methods: {
    async validate() {
      console.log('About to validate')
      const valid = await this.$refs.form.validate()
      console.log(valid)
      console.log('Done validating')
      if (valid == true) { this.dialog = false; this.addWorld() }
    },
    async addWorld() {
      // init arr of values
      // convert undefined values to empty string
      let arr = [this.worldName, this.worldDesc, this.worldImg].map(val => {
        if (val == undefined) {return ""} else {return val}
      });
      console.log(arr)
      // assign values to vars
      let [worldName, worldDesc, worldImage] = arr;
      console.log(worldDesc)
      // convert world name
      worldName = worldName.replace(/</g, '').replace(/>/g, '').replace(/'/g, "").replace(/"/g, '')
      // check for name and change if needed
      worldName = this.$checkname(worldName)

      // convert to data url
      if (worldImage === null || worldImage === undefined || worldImage == "") {
        worldImage = await this.$convertToDataUrl(null)
        console.log('Done processing default image')
      } else {
        console.log('Image provided')
        worldImage = await this.$convertToDataUrl(worldImage);
        console.log('Done proccessing provided image')
      }
        console.log('Done with images')
        // non-JSON world
        const nonJsonWorld = {
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

        // reset form
        this.$refs.form.reset();
    },
  },
};
</script>