<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Add new items</h1>
        <div class="pa-2" id="info">
          <v-text-field
            label="Name of Bagel"
            required
            v-model="name"
            placeholder="I would like to have..."
          ></v-text-field>
          <v-text-field
            label="Description of Bagel"
            required
            v-model="description"
          ></v-text-field>
          <v-text-field label="Price of Bagel" required v-model="price">
          </v-text-field>
          <!--  -->
          <v-file-input label="File input" @change="uploadImage"></v-file-input>
          <v-btn
            color="success"
            small
            @click="addNewMenuItem()"
            :disabled="btnDisable"
            >Add Item</v-btn
          >
          <v-btn color="warning" small>Cancel </v-btn>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Preview</h1>
        <div class="pa-2" id="info">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 70%">Name</th>
                  <th class="text-left" style="width: 100px">Price:Rs/-</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span id="td_name">{{ name }}</span
                    ><br />
                    <span id="menu_item_description">{{ description }}</span>
                  </td>
                  <td id="preview_menuitems_price">{{ price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { dbMenuAdd, fb } from "../../../firebase";
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisable: true,
    };
  },
  methods: {
    uploadImage(e) {
      let file = e;
      console.log(file);
      // var storageRef = firebase.storage().ref("products/" + file.name);
      const storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.image = downloadURL;
            this.btnDisable = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.col h1 {
  border: 5px solid #fff;
  padding: 10px;
  margin-bottom: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}
.col:last-child h1 {
  text-align: left;
}
#info {
  background-color: #fff;
}

tr th {
  font-weight: 300;
}

#td_name {
  font-weight: bold;
}

tr td {
  padding: 10px 10px 10px 16px;
}

#menu_item_description {
  font-style: italic;
  font-weight: 300;
  font-size: 13px;
  color: darkgray;
  text-align: center;
}

#basket_checkout p:first-child {
  line-height: 1px;
}
</style>
