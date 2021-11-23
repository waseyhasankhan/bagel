import Vue from "vue";
// import Vuetify from "vuetify/lib";
import Vuetify from "vuetify/lib/framework";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        white: "#ffffff",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        complete: "#2BFC83",
        inprogress: "#FFB936",
        incomplete: "#FF1212",
      },
    },
  },
});
