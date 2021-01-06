import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
const fs = window.require('fs')

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development';

/* global __static */
Vue.prototype.$static = __static

// global fs
Vue.prototype.$fs = fs

Vue.prototype.$convertToDataUrl = function(image) {
  console.log('Image: ' + image)
  if (image != null) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = error => reject(error);
      fr.onload = res => resolve(res.target.result)
      fr.readAsDataURL(image)
    }) 
  } else {
    return 'data:image/png;base64,'+ fs.readFileSync(__static+'\\'+store.state.defaultImg, 'base64')
  }
}

Vue.prototype.$checkname = function(name) {
  // count for number of worlds matched
  var matchedWorlds = 0;
  // loop through each world in state array
  this.$store.state.worldsList.forEach(world => {
    if (world.name.includes(name)) {
      matchedWorlds++;
      console.log('Named matched another world')
      console.log(world.name)
    }
  })
  console.log(`Initial matched worlds: ${matchedWorlds}`)
  console.log('Now checking a second time')
  // check matchedWorlds number and append correct number
  if (matchedWorlds > 0) {
    // flag to check if number is not already taken
    let correctNumber = false
    // while loop to loop thru each elm (for loop) and check if current num (matchedWorlds) matches any other world name
    // runs each time a number is supplied/incremented
    while (correctNumber == false) {
      console.log('Current Number checking for: ' + matchedWorlds + 1)
      // false = world found w/ same number; true = none found
      // starts at true bc if no worlds are found it does not trigger increment at end
      let flag = true;
      // loops through each world in worldsList
      for (let i = 0; i < this.$store.state.worldsList.length; i++) {
        // checks if current item contains name and number
        // checks name cuz no context was given
        if (this.$store.state.worldsList[i].name.includes(`${name} (${matchedWorlds + 1})`)) {
          // sets flag to false and breaks so that if statement after increments
          // break cuz only need one occurence to need to increment
          flag = false
          break;
        }
      }
      if (flag == false) {
        matchedWorlds++
      } else {
        correctNumber = true;
      }
    }
    name += ` (${matchedWorlds + 1})`
  }
  return name;
}

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')