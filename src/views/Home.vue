<template :key='reloadKey'>
    <v-main color="secondary">
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
                    <v-btn @click.native="nav(item)"><v-icon left>mdi-book</v-icon>View Coords</v-btn>
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
  data: function () {
    return {
      reloadKey: 0
    }
  },
  methods: {
    nav(world) {
      this.$store.dispatch('commitCurrentWorld', world)
      this.$router.push({name: 'WorldView', params: {world: world.name}})
    },
    reloadComponent: function () {
      this.reloadKey += 1;
    }
  }
}
</script>
