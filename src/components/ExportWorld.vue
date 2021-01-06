<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="30%">
      <template v-slot:activator="{ on }">
        <v-btn color="info" dark v-on="on">Export World</v-btn>
      </template>
      <v-card>
          <v-card-title> Export World? </v-card-title>
          <v-card-subtitle><strong>{{this.$store.state.currentWorld.name}}</strong></v-card-subtitle>
          <v-card-actions>
              <v-btn color="error" outlined @click.native="dialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" @click.native="save(); dialog = false">Download World</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
var FileSaver = require('file-saver');

export default {
  name: "ExportWorld",
  data: function() {
    return {
      dialog: false,
    };
  },
  methods: {
      save() {
          let data = {
              [this.$store.state.currentWorld.name]: this.$store.state.currentWorld
          }
          var blob = new Blob([JSON.stringify(data)], {type: 'application/json'})
          try {
            FileSaver.saveAs(blob, "world-download.json")
          } catch (error) {
            const errorNotification = new Notification('Error Exporting!', {body: "Error Exporting World! Try restarting the app and trying later! Additionally, check the console if you know what you're doing."})
            console.log(error)
            errorNotification
          }
          
      }
  }
};
</script>