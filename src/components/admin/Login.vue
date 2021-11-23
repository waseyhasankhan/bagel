<template>
  <v-container>
    <v-row>
      <v-col offset-md="3" md="5" xs="12">
        <h1>Administrator Login</h1>
        <div id="info">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
          <v-btn color="green" @click.prevent="signIn">
            <!-- <v-icon>login</v-icon> -->
            Login</v-btn
          >
          <v-btn color="red" @click.prevent="signOut">
            <!-- <v-icon>login</v-icon> -->
            SignOut</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
// import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Signed in
          this.$router.replace("/admin");
          //   var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert(
              "OOPS! Wrong Password. Try the one which you entered the last time"
            );
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      //   console.log("Test user login info", this.email, this.password);
    },

    // firebase.auth().signOut().then(() => {
    // Sign-out successful.
    // }).catch((error) => {
    // An error happened.
    // });

    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("User sign-out successfully");
          this.$router.replace("/");
          // Sign-out successful
        })
        .catch((error) => {
          alert(error);
          // An error happened
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#info {
  padding: 20px;
}
</style>
