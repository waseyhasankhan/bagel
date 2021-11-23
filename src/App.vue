<template>
  <v-app id="app">
    <navigation />
    <!-- <v-content> -->
    <!-- </v-content> -->
    <v-main>
      <!-- <v-container class="fill-height" fluid> -->
      <router-view></router-view>
      <!-- If using vue-router -->
      <!-- </v-container> -->
      <!--  -->
    </v-main>
    <!-- <v-footer app>
      &copy; by WHK
      
    </v-footer> -->
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: { Navigation },

  name: "App",
  props: {
    source: String,
  },
};
</script>

<style lang="scss">
main {
  background-image: url("../src/assets/bagel-hero.jpg");
  background-size: cover;
}
.col h1 {
  border: 5px solid #fff;
  padding: 10px;
  margin-bottom: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
}
.col:last-child h1 {
  text-align: center;
}
#info {
  background-color: #fff;
}
</style>
