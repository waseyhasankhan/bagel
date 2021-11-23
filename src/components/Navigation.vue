<template>
  <div>
    <v-navigation-drawer color="secondary" v-model="drawer" app>
      <div v-if="currentUser">
        <!-- profile card -->
        <v-card class="mx-auto" max-width="200" tile>
          <v-img
            height="100%"
            src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
          >
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="65" tile>
                  <v-img src="../../src/assets/user1.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="text-h7">
                      {{ currentUser.email }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>

        <h4>{{ currentUser.email }}</h4>
      </div>
      <ul>
        <router-link tag="li" to="/"
          ><v-icon color="orange">home</v-icon> Home</router-link
        >
        <router-link tag="li" to="/menu"
          ><v-icon color="orange">restaurant_menu</v-icon> Menu</router-link
        >
        <router-link tag="li" to="/about"
          ><v-icon color="warning">info</v-icon> About</router-link
        >
        <router-link tag="li" to="/login"
          ><v-icon color="orange">login</v-icon> Login</router-link
        >
        <router-link
          tag="li"
          v-if="currentUser"
          to="/orders"
          class="complete--text"
          ><v-icon color="complete">assignment</v-icon> Orders</router-link
        >
        <router-link tag="li" to="/admin"
          ><v-icon color="orange">lock</v-icon> Admin</router-link
        >
      </ul>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline">
        <span> BAGELS BY: </span>
        <span class="font-weight-medium">WASEY HASAN KHAN</span>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { db } from "../../firebase";
import firebase from "firebase";
import "firebase/firestore";
import store from "../store/index.js";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    currentUser() {
      console.log(db);
      return this.$store.getters.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
  color: orange;
}
nav li {
  margin-left: 10%;
  padding: 5px 20px;
  cursor: pointer;
  list-style: none;
}
nav li:last-child {
  position: absolute;
  bottom: 40px;
}
nav li i {
  // color: #fff;
  margin-right: 10px;
}
</style>
