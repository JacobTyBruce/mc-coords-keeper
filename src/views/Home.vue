<template>
    <v-main>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Choose World</v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" three-line>
                <v-list-item-content>
                  <v-list-item-title>{{item.title}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.desc}}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-btn :to="{name: 'WorldView', params: {world: item.title, worldData: item}}">View Coords</v-btn>
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
  data: function() {
    return {
      items: [
      { title: 1, desc: 'desc1', routeTo: '/world1' },
      { title: 2, desc: 'desc2', routeTo: '/world2' },
      { title: 3, desc: 'desc3', routeTo: '/world3' },
      { title: 4, desc: 'desc4', routeTo: '/world4' },
      ]
    };
  }
}
</script>
