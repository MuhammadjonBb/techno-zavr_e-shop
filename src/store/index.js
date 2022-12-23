/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  loadOrderInfo,
  loadCart,
  addProductCart,
  deleteProductCart,
  updateCartProductAmount,
} from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { cartProductId, amount }) {
      const item = state.cartProducts.find((el) => el.cartProductId === cartProductId);
      if (item) item.amount = amount;
    },
    deleteCartProduct(state, cartProductId) {
      // eslint-disable-next-line max-len
      state.cartProducts = state.cartProducts.filter((item) => item.cartProductId !== cartProductId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCardProductsData(state, cartProducts) {
      state.cartProductsData = cartProducts;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productOfferId: item.productOffer.id,
        amount: item.quantity,
        colorId: item.color.id,
        cartProductId: item.id,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line max-len
        const product = state.cartProductsData.find((p) => p.id === item.cartProductId).productOffer;
        return {
          ...item,
          product: {
            ...product,
            image: product.product.preview.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
  actions: {
    loadOrderInfo,
    loadCart,
    addProductCart,
    deleteProductCart,
    updateCartProductAmount,
  },
});
