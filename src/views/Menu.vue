<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Menu Items</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left" style="width: 70%">Name of item</th>
                  <th class="text-left" style="width: 100px">Price</th>
                  <th class="text-left" style="width: 100px">
                    Add to e-Basket
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <td id="td_menuitem_img">
                    <v-img :src="item.image"></v-img>
                  </td>
                  <span id="td_name">
                    <td>{{ item.name }}</td>
                  </span>
                  <br />
                  <span id="menu_item_description">
                    <td>{{ item.description }}</td>
                  </span>

                  <td>{{ item.price }}</td>
                  <td>
                    <v-btn text small @click="addToBasket(item)">
                      <v-icon color="orange">add_box</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Current Basket</h1>
        <div class="pa-2" id="info">
          <v-simple-table id="menu-table" v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 30%">Quantity</th>
                  <th class="text-left" style="width: 50%">Name of item</th>
                  <th class="text-left" style="width: 20%">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    <v-icon color="orange" @click="increaseQuantity(item)"
                      >add_box</v-icon
                    >{{ item.quantity }}
                    <v-icon color="orange" @click="decreaseQuantity(item)"
                      >indeterminate_check_box</v-icon
                    >
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    {{ item.price }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table v-else>
            <p>Hmmm. Seems the basket is empty.🧐</p>
          </v-simple-table>
          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4" style="margin: 0">
            <v-col>
              <p>Subtotal :</p>
              <p>Delivery :</p>
              <p>Total amount :</p>
            </v-col>
            <v-col class="text-right"
              ><p>₹{{ subTotal }}</p>
              <p>₹10</p>
              <p>
                <strong> ₹{{ total }} </strong>
              </p>
            </v-col>
          </v-row>

          <v-row style="margin: 0">
            <v-spacer></v-spacer>
            <v-btn color="orange" @click="addCheckoutItem()">Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basketDump: [],
      // menuItems: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
    console.log(dbMenuAdd);
  },

  methods: {
    addToBasket(item) {
      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
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
    addCheckoutItem() {
      this.$store.dispatch("setCheckoutItem");
    },
  },
  computed: {
    basket() {
      // return this.$store.state.basketItems;
      return this.$store.getters.getBasketItems;
    },
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

#td_menuitem_img {
  max-width: 40px;
  max-height: 40px;
  padding: 0;
}
</style>
