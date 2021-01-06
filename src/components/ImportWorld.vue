<template>
  <v-menu v-model="dialog" max-width="300" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn color="info" left v-on="on" class="mr-4">Import World</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Import World</v-card-title>
      <v-card-text> NOTE: Importing a world with the same name as an existing world will cause it to override the existing one </v-card-text>
      <v-form max-width="80%">
        <v-container>
          <v-row>
            <v-col>
              <v-file-input padding="10px" prepend-icon="mdi-earth" v-model="upload" :rules="rules" accept="application/JSON"></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false; checkWorld();">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
//const notifier = window.require('node-notifier'); not building -- fix if possible

export default {
  name: "ImportWorld",
  data: function () {
    return {
      dialog: false,
      upload: null,
      rules: [
        value => !!value || 'Please select a world!'
      ]
    };
  },
  methods: {
    checkWorld() {
      if (!this.upload) {
        alert("No File Chosen");
        return;
      }
      var fileRead = new FileReader();
      fileRead.readAsText(this.upload);
      fileRead.onload = () => {
          let worldFile = JSON.parse(fileRead.result);
          // checks if worldFile is single world. This is achieved by checking if name prop is set on object
          // because multi-world JSON file would not have top-level name prop as worlds are stored with their
          // being top-level prop
          console.log(worldFile)
          // checks if top-level has name prop, thus declaring a single-world file
          if (Object.prototype.hasOwnProperty.call(worldFile, 'name')) {
            try {
              worldFile.name = this.$checkname(worldFile.name)
              this.$store.dispatch('commitNewWorld', worldFile)
              const successNotification = new Notification('Success!', {body: 'World Added Successfully!'})
              successNotification
              return;
            } catch (error) {
              const errorNotification = new Notification('Uh Oh!', {body: "World was imported, but failed to upload!"})
              errorNotification
            }
            
          }
          // this fires if multi-world file, stores each world as an element in array, then gets looped over later
          let worldFileArray = Object.values(worldFile);
          console.log(worldFileArray)
          let errorCount = 0;
          let successCount = 0;
          // loops over multiple worlds committing each if they have needed props
          worldFileArray.forEach(world => {
            console.log(world)
              if (Object.prototype.hasOwnProperty.call(world, 'name') && Object.prototype.hasOwnProperty.call(world, 'desc') && Object.prototype.hasOwnProperty.call(world, 'coords')) {
                  world.name = this.$checkname(world.name)
                  this.$store.dispatch('commitNewWorld', world)
                  successCount += 1;
              }
              else {
                  console.log("Cannot Set, wrong format")
                  errorCount += 1;
              }
              if (errorCount === 0) {
                  //notifier.notify({appName: "com.jacobtbruce.mcc", title: 'Success!', message: 'All World(s) Added Successfully!'})
                  const successNotification = new Notification('Success!', {body: 'All World(s) Added Successfully!'})
                  successNotification
              } else {
                  //notifier.notify({appName: "com.jacobtbruce.mcc", title: 'Uh Oh!', message: successCount + " world(s) imported correctly, and " + errorCount + " world(s) failed to upload!",})
                  const errorNotification = new Notification('Uh Oh!', {body: successCount + " world(s) imported correctly, but " + errorCount + " world(s) failed to upload!"})
                  errorNotification
              }
          })
          this.upload = null
      };
        
    },
  },
};
</script>