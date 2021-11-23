<template>
  <v-container fluid>
    <v-row>
      <v-col offset-md="1" md="6">
        <h1>Orders</h1>
        <div class="pa-2" id="info">
          <v-row class="ma-0">
            <v-col cols="12" md="1" class="pa-2">
              <p class="font-weight-bold body-1 pl-1 darkgrey--text">INFO:</p>
            </v-col>

            <v-col cols="12" md="5" class="pa-2 pl-5">
              <v-row align="center">
                <div id="status_box" class="success">COMPLETED</div>
                <!-- <v-chip color="success">COMPLETED</v-chip> -->
                <span class="font-weight-light caption pl-1">Done</span>
              </v-row>

              <v-row align="center">
                <div id="status_box" class="orange">IN-PROGRESS</div>
                <span class="font-weight-light caption pl-1"
                  >Under progress</span
                >
              </v-row>

              <v-row align="center">
                <div id="status_box" class="error">NOT STARTED</div>
                <span class="font-weight-light caption pl-1"
                  >Wait a minute!</span
                >
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pa-2">
              <v-row>
                <div id="status_box" class="success">COMPLETED</div>
                <div id="status_box" class="orange">IN-PROGRESS</div>
                <div id="status_box" class="error">NOT STARTED</div>
                <!-- <v-chip color="success">COMPLETED</v-chip>
                <v-chip color="warning">IN-PROGRESS</v-chip>
                <v-chip color="error ">NOT STARTED</v-chip> -->
              </v-row>
              <v-row>
                <p class="font-weight-light capton pl-1">
                  <b> Single click</b> to switch stage: complete => in-progress
                  => <b> Double-click</b> the box to reset to 'not started'
                </p>
                <span class="font-weight-light caption pl-1">
                  <v-icon>archive</v-icon>
                  Archive to 'hide' it from orders list
                </span>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <!-- Orders List Area -->
        <div class="pa-2 mt-1" id="info">
          <p class="font-weight-bold body-1 pa-3 darkgrey--text">ORDERS:</p>
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 10%">Order no.</th>
                  <th class="text-left" style="width: 10%">QTY</th>
                  <th class="text-left" style="width: 40%">Item</th>
                  <th class="text-left" style="width: 10%">Price</th>
                  <th class="text-left" style="width: 10%">Status</th>
                  <th class="text-left" style="width: 10%">Archive Item</th>
                  <th class="text-left" style="width: 10%">Remove</th>
                </tr>
              </thead>
              <tbody class="font-weight-light">
                <tr
                  v-for="item in orderItems"
                  :key="item.name"
                  v-show="item.storeOrder === false"
                >
                  <!-- Here, we tackled the error by using v-show , instead of v-if -->
                  <td>{{ item.orderNumber }}</td>
                  <td class="py-3">
                    <p
                      style="margin: 0"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >
                      {{ subitem.quantity }}
                    </p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin: 0"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >
                      {{ subitem.name }}
                    </p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin: 0"
                      v-for="subitem in item.orderLines"
                      :key="subitem.id"
                    >
                      {{ subitem.price }}
                    </p>
                  </td>
                  <td>
                    <div
                      id="status_box"
                      :class="item.status"
                      @click="switchStage(item.id)"
                    >
                      {{ item.status }}
                    </div>
                  </td>
                  <td>
                    <v-btn text small @click="archiveOrderItem(item.id)">
                      <v-icon color="secondary">archive</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn text small @click="deleteOrderItem(item.id)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-col offset-md="0" md="4">
        <h1>Revenue</h1>

        <div class="pa-2" id="info">
          <p class="font-weight-bold body-1 darkgrey--text">
            Completed Orders:
          </p>
          <div>
            <p id="totalorders">
              Total Orders:<span class="font-weight-bold incomplete--text">{{
                orderItems.length
              }}</span>
            </p>
          </div>
          <div
            id="revenueList"
            v-for="item in orderItems"
            :key="item.name"
            v-show="item.archive == false"
          >
            <!-- Same here (as on the line 77), we tackled the error by using v-show , instead of v-if -->
            <p>
              Order Number:{{ item.orderNumber }}
              <v-btn small text @click="deleteOrderItem(item.id)">
                <v-icon color="incomplete">delete</v-icon>
              </v-btn>
            </p>
          </div>
        </div>
        <div class="pa-2 mt-1" id="info">
          <div id="totalRevenue">
            <p id="totalRevenueText">
              Total Revenue :
              <span id="totalRevenueTextTotal"> {{ revenueTotal }}</span>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbOrders } from "../../firebase";

export default {
  data() {
    return {
      basketDump: [],
    };
  },
  beforeCreate() {
    this.$store.dispatch("setOrderItems");
  },

  methods: {
    switchStage(id) {
      let selectedOrderItem = this.orderItems.filter(
        (item) => item.id === id
      )[0];
      if (selectedOrderItem.status === "inprogress") {
        dbOrders
          .doc(id)
          .update({ status: "complete" })
          .then(() => {});
      } else if (selectedOrderItem.status === "incomplete") {
        dbOrders
          .doc(id)
          .update({ status: "inprogress" })
          .then(() => {});
      } else if (selectedOrderItem.status === "complete") {
        dbOrders
          .doc(id)
          .update({ status: "incomplete" })
          .then(() => {});
      }
    },
    archiveOrderItem(id) {
      dbOrders
        .doc(id)
        .update({ archive: true, storeOrder: true })
        .then(() => {});
    },
    addToBasket(item) {
      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
    },
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("Stuff is deleted");
        })
        .catch((error) => {
          console.log(error);
        });
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
  },
  computed: {
    basket() {
      // return this.$store.state.basketItems;
      return this.$store.getters.getBasketItems;
    },
    orderItems() {
      return this.$store.getters.getOrderItems;
    },
    // storeOrderTest() {
    //   return this.orderItems.filter((oItem) => oItem.storeOrder == false);
    // },
    // subTotal() {
    //   let subCost = 0;
    //   for (const items in this.basket) {
    //     const individualItem = this.basket[items];
    //     subCost += individualItem.quantity * individualItem.price;
    //   }
    //   return subCost;
    // },
    // total() {
    //   let deliveryPrice = 10;
    //   const totalCost = this.subTotal;
    //   return totalCost + deliveryPrice;
    // },
    revenueTotal() {
      let revenueIncome = 0;

      this.orderItems.forEach((element) => {
        if (element.archive === true) {
          element.orderLines.forEach((elem) => {
            revenueIncome += elem.price * elem.quantity;
          });
        }
      });
      return revenueIncome;
    },
  },
};
</script>

<style lang="scss" scoped>
#status_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 90px;
  font-size: 12px;
  border-radius: 2px;
  margin: 5px 0;
  color: #fff;
  text-shadow: 1px 1px 1px #fff;
}

#totalRevenue {
  // display: flex;
  padding: 20px 10px 20px 0;
}
#totalRevenueText {
  display: flex;
  justify-content: space-between;
  font-style: italic;
  margin: 0;
  width: 100%;
}
#totalRevenueTextTotal {
  font-style: normal;
  text-decoration: underline;
  border-bottom: 1px solid #000;
  font-weight: bold;
}
</style>
