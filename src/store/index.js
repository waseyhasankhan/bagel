import Vue from "vue";
import Vuex from "vuex";
import { dbMenuAdd, dbOrders } from "../../firebase";

import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    basketItems: [],
    menuItems: [],
    orderItems: [],
    currentUser: null,
  },
  mutations: {
    addCheckoutItem(state, basketItems) {
      console.log(basketItems);
      dbOrders.add({
        archive: false,
        storeOrder: false,
        orderNumber: state.counter++,
        status: "incomplete",
        orderLines: state.basketItems,
      });
    },
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach((item) => {
          if (
            state.basketItems.find(
              (itemExitsInArray) => item.name === itemExitsInArray.name
            )
          ) {
            item = state.basketItems.find(
              (itemExitsInArray) => item.name === itemExitsInArray.name
            );

            // this.increaseQuantity(item);
            item.quantity++;
          } else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: 1,
            });
          }
        });
      }
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    },

    setMenuItems: (state) => {
      let menuItems = [];

      dbMenuAdd.onSnapshot((snapshotItems) => {
        menuItems = [];
        snapshotItems.forEach((doc) => {
          const menuItemData = doc.data();
          menuItems.push({ ...menuItemData, id: doc.id });
        });
        state.menuItems = menuItems;
      });
    },
    setOrderItems: (state) => {
      let orderItems = [];
      dbOrders.onSnapshot((snapshotItems) => {
        orderItems = [];
        snapshotItems.forEach((doc) => {
          const orderItemData = doc.data();
          orderItems.push({ ...orderItemData, id: doc.id });
        });
        state.orderItems = orderItems;
      });
    },
  },
  actions: {
    setCheckoutItem(context) {
      context.commit("addCheckoutItem");
    },

    setUser(context, user) {
      context.commit("userStatus", user);
    },
    setMenuItems: (context) => {
      context.commit("setMenuItems");
    },
    setOrderItems: (context) => {
      context.commit("setOrderItems");
    },
  },
  getters: {
    getBasketItems: (state) => state.basketItems,
    currentUser: (state) => state.currentUser,
    getMenuItems: (state) => state.menuItems,
    getOrderItems: (state) => state.orderItems,
  },
  modules: {},
});
