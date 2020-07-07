<template>
    <v-main>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Choose World</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in this.$store.state.worldsList" :key="index" three-line>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.desc}}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-btn :to="{name: 'WorldView', params: {world: item.name}}" v-on:click="this.setWorld(item)">View Coords</v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    setWorld: function(world) {
      alert('hey')
      this.$store.dispatch('commitCurrentWorld', world)
      
    }
  }
}
</script>
