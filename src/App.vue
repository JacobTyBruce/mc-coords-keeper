<template>
  <v-app>
    <v-menu :offset-y="offset" :close-on-click="closeOnClick">
      <template v-slot:activator="{ on }">
        <button v-on="on">Click</button>
      </template>
    </v-menu>
    <v-list v-for='(item, index) in items' v-bind:key="index">
      {{item.title}}
    </v-list>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
    items: [
      {title: 1},
      {title: 2},
      {title: 3},
      {title: 4}
    ],
    closeOnClick: true
  }
  }
};
</script>
