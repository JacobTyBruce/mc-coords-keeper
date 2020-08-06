<template>
  <v-menu v-model="dialog" width="400" max-width="500" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn color="info" right v-on="on">Import World</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Import World</v-card-title>
      <v-form max-width="80%">
        <v-container>
          <v-row>
            <v-col>
              <v-file-input padding="10px" v-model="upload"></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false" left>Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false; checkWorld()">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
// const notifier = window.require('node-notifier'); module not working with Windows 10, need to find fix or implement specfic OS notifications

export default {
  name: "ImportWorld",
  data: function () {
    return {
      dialog: false,
      upload: null,
    };
  },
  methods: {
    checkWorld() {
      if (!this.upload) {
        alert("No File Chosen");
      }
      var fileRead = new FileReader();
      fileRead.readAsText(this.upload);
      fileRead.onload = () => {
          let worldFile = JSON.parse(fileRead.result);
          let worldFileArray = Object.values(worldFile);
          let errorCount = 0;
          let successCount = 0;
          worldFileArray.forEach(world => {
              if (Object.prototype.hasOwnProperty.call(world, 'name') && Object.prototype.hasOwnProperty.call(world, 'desc') && Object.prototype.hasOwnProperty.call(world, 'coords')) {
                  this.$store.dispatch('commitNewWorld', world)
                  successCount += 1;
              }
              else {
                  console.log("Cannot Set, wrong format")
                  errorCount += 1;
              }
              if (errorCount === 0) {
                  //notifier.notify({appName: "mcc-keeper", title: 'Success!', message: 'All World(s) Added Successfully!'})
                  const successNotification = new Notification('Success!', {body: 'All World(s) Added Successfully!'})
                  successNotification.show()
              } else {
                  //notifier.notify({appName: "mcc-keeper", title: 'Uh Oh!', message: successCount + " world(s) imported correctly, but " + errorCount + " world(s) failed to upload!"})
                  const errorNotification = new Notification('Uh Oh!', {body: successCount + " world(s) imported correctly, but " + errorCount + " world(s) failed to upload!"})
                  errorNotification.show()
              }
          })
      };
        
    },
  },
};
</script>