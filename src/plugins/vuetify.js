import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#3f51b5",
                secondary: "#2196f3",
                accent: "#009688",
                error: "#f44336",
                warning: "#ffc107",
                info: "#607d8b",
                success: "#8bc34a"
            },
            dark: {
                primary: "black"
            }
        }
    }
});
