<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="50%">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on">Delete World</v-btn>
      </template>
      <v-card>
          <v-card-title>Are You sure?</v-card-title>
          <v-card-subtitle>Once you delete this world, you won't be able to get it back!</v-card-subtitle>
          <v-card-text> 
              <v-container>
                  <v-row>
                      <v-col cols='5'>
                          <v-img :src="this.$store.state.defaultImg"></v-img>
                      </v-col>
                      <v-col>
                          <v-list>
                              <v-list-item>{{currentWorld.name}}</v-list-item>
                              <v-list-item v-if="currentWorld.desc.length > 0">{{currentWorld.desc}}</v-list-item>
                              <v-list-item v-if="currentWorld.desc.length == 0">No Description</v-list-item>
                              <v-list-item>Locations - {{currentWorld.coords.length}}</v-list-item>
                          </v-list>
                      </v-col>
                  </v-row>
              </v-container>
          </v-card-text>
          <v-card-actions>
              <v-container>
                  <v-row><v-btn color='info' @click="dialog = false"> No, take me back! </v-btn><v-spacer></v-spacer><v-btn color='error' @click.stop='deleteWorld()'>Yes, Delete</v-btn></v-row>
              </v-container>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "DeleteWorld",
  data: function() {
    return {
      dialog: false,
    };
  },
  computed: {
      ...mapState(['currentWorld'])
  },
  methods: {
    deleteWorld: async function() {
      this.$store.dispatch('commitDeleteWorld', this.$store.state.currentWorld);
      this.$router.push('/');
    }
  }
};
</script>