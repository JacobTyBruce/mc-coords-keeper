<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="50%"
        transition="dialog-transition"
    >
    <template v-slot:activator="{ on }">
        <v-btn color="orange" depressed outlined small v-on="on">Edit</v-btn>
      </template> 
      <v-card>
          <v-card-title>Edit Location</v-card-title>
          <v-card-subtitle>{{this.location.name}}</v-card-subtitle>
          <v-card-actions>
              <v-btn color='success' @click='editLocation(location); dialog = false'>Save</v-btn><v-spacer></v-spacer><v-btn color='error' @click="dialog = false">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'EditCoords',
    props: ['location'],
    data: function() {
        return {
            dialog: false,
        }
    },
    methods: {
        ...mapActions({
            editLocation: 'commitEditLocation'
        })
    }
}
</script>