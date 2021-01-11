<template>
  <v-dialog v-model="dialog" persistent max-width="45%" transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="orange" depressed v-on="on" medium>
        <v-icon medium left>mdi-pencil-outline</v-icon>Edit World
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-card-title>Edit World</v-card-title>
        </v-row>
        <v-row>
          <v-col>
            <v-img :src="this.currentWorld.img"></v-img>
          </v-col>
          <v-col>
            <v-card-subtitle>Current Title: {{this.currentWorld.name}}</v-card-subtitle>
            <v-card-subtitle v-if="this.$store.state.currentWorld.desc.length === 0">No Current Description</v-card-subtitle>
            <v-card-subtitle v-else>Current Description: {{this.currentWorld.desc}}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-form max-width="80%" ref="form">
              <v-container>
                <v-row>
                  <v-col justify-space-around>
                    <v-text-field type="text" single-line label="New Name" v-model="newName"></v-text-field>
                    <v-text-field type="text" single-line label="New Description" v-model="newDesc"></v-text-field>
                    <v-file-input label="New Image" v-model="newImg" :value="this.previewImgTitle" @change="setPreview()">{{this.newImg.name}}</v-file-input>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false; saveWorld()"
                >Edit</v-btn> 
              </v-card-actions>
            </v-form>
          </v-col>
          <v-col>
            <v-img :src="previewImg" alt="Preview" max-height="100%" max-width="100%"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EditWorld",
  data: function () {
    return {
      dialog: false,
      newName: this.$store.state.currentWorld.name,
      newDesc: this.$store.state.currentWorld.desc,
      newImg: this.$store.state.currentWorld.img,
      previewImg: this.$store.state.currentWorld.img,
      previewImgTitle: ""
    };
  },
  watch: {
    dialog(newVal) {
      console.log(this.currentWorld)
      if (newVal == false) { this.$refs.form.resetValidation(); this.newName = this.currentWorld.name; this.newDesc = this.currentWorld.desc; this.newImg = this.currentWorld.img; this.previewImgTitle = ""}
      
    }
  },
  methods: {
    ...mapActions({
      editLocation: "commitEditWorld",
    }),
    parseImg(img) {
        const fr = new FileReader();
        return new Promise((resolve, reject) => {
          fr.readAsDataURL(img);
          fr.onerror = () => {
            fr.abort();
            reject(new DOMException("Problem parsing input file."));
          };

          fr.onload = () => {
            resolve(fr.result);
          };
        }).then(value => {return value})
    },
    async setPreview() {
      console.log(this.newImg instanceof Blob)
      console.log(this.newImg)
      console.log(this.newImg.name)
      this.previewImgTitle = this.newImg.name
      const imgSrc = await this.parseImg(this.newImg);
      this.previewImg = imgSrc
      this.newImg = imgSrc
    },
    saveWorld() {
      let world = {
        name: this.newName,
        desc: this.newDesc, 
        img: this.newImg,
        coords: this.$store.state.currentWorld.coords
      }
      this.$store.dispatch('commitEditWorld', world)
    }
  },
  computed: mapState([
    'currentWorld'
  ])
};
</script>