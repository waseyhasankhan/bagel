<template>
  <v-container>
    <v-snackbar top v-model="updatedSuccess">
      {{ updatedText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          color="orange"
          text
          v-bind="attrs"
          @click="updatedSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Current Bagels in menu items</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 70%">
                    Name
                    <v-btn small text color="orange" to="/addNew">
                      <v-icon>add</v-icon
                      ><span style="padding: 0 10px"> Add Item</span>
                    </v-btn>
                  </th>
                  <th class="text-left" style="width: 100px">Price</th>
                  <th class="text-left" style="width: 100px">Edit</th>
                  <th class="text-left" style="width: 100px">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <span id="td_name">
                    <td>{{ item.name }}</td>
                  </span>
                  <br />
                  <span id="menu_item_description">
                    <td>{{ item.description }}</td>
                  </span>

                  <td>{{ item.price }}</td>
                  <td>
                    <v-btn
                      small
                      text
                      @click.stop="dialog = true"
                      @click="editItem(item)"
                    >
                      <v-icon color="orange">edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <!-- Here, we are using 'item.id' as a parameter to because, 'item'(Ln24,Col28) here is looping through all the menuItems array & at the same time, we are passing the 'id' of the current item. CHEESE :)  -->
                    <v-btn small text @click="deleteItem(item.id)">
                      <v-icon color="orange">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Preview</h1>
        <div class="pa-2" id="info">Right</div>
      </v-col>
      <v-row>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <h1>Edit items</h1>
            <div class="pa-5" id="info">
              <v-text-field v-model="item.name"></v-text-field>
              <v-text-field v-model="item.description"></v-text-field>
              <v-text-field v-model="item.price"> </v-text-field>
              <v-btn
                color="success"
                small
                @click="updateItem()"
                @click.stop="dialog = false"
                >Save</v-btn
              >
              <v-btn color="warning" small @click.stop="dialog = false"
                >Close
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basket: [],
      dialog: false,
      item: [],
      activeEditItem: null,
      updatedSuccess: false,
      updatedText: "Menu item has been updated!",

      // menuItems: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },

  methods: {
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSuccess = true;
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    addToBasket(item) {
      if (
        this.basket.find(
          (itemExitsInArray) => item.name === itemExitsInArray.name
        )
      ) {
        item = this.basket.find(
          (itemExitsInArray) => item.name === itemExitsInArray.name
        );
        this.increaseQuantity(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },

  computed: {
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    subTotal() {
      let subCost = 0;
      for (const items in this.basket) {
        const individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      let deliveryPrice = 10;
      const totalCost = this.subTotal;
      return totalCost + deliveryPrice;
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
