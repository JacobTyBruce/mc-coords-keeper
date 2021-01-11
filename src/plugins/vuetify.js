import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            // made by Haley G. Instagram: @haley.21.0
            light: {
                primary: "#4a6f28",
                secondary: "#2196f3",
                accent: "#5b8b32",
                error: "#f44336",
                warning: "#ffc107",
                info: "#607d8b",
                success: "#8bc34a"
            },
            dark: {
                primary: "#146292"
            }
        }
    }
});
