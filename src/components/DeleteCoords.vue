<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="50%"
        transition="dialog-transition"
    >
    <template v-slot:activator="{ on }">
        <v-btn color="red" depressed outlined medium v-on="on">Delete<v-icon dark medium right>mdi-delete</v-icon></v-btn>
      </template> 
      <v-card>
          <v-card-title>Delete Location</v-card-title>
          <v-card-subtitle>{{this.location.name}}</v-card-subtitle>
          <v-card-actions>
             <v-btn color='success' @click="dialog = false">Close</v-btn> <v-spacer></v-spacer><v-btn color='error' @click='deleteLocation(location); dialog = false'>Delete</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'DeleteCoords',
    props: ['location'],
    data: function() {
        return {
            dialog: false,
        }
    },
    methods: {
        ...mapActions({
            deleteLocation: 'commitDeleteLocation'
        })
    }
}
</script>