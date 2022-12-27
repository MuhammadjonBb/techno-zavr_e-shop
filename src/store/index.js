/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  getOrderInfo,
  getCart,
  postProductCart,
  deleteProductCartRequest,
  putCartProductAmount,
} from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
    isCartLoading: false,
  },
  mutations: {
    updadeIsCartLoading(state) {
      state.isCartLoading = !state.isCartLoading;
    },
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
    loadOrderInfo(context, orderId) {
      getOrderInfo(context, orderId)
        .then((res) => {
          context.commit('updateOrderInfo', res.data);
        });
    },
    loadCart(context) {
      getCart(context)
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        })
        .finally(() => context.commit('updadeIsCartLoading'));
    },
    addProductCart(context, { productOfferId, amount, colorId }) {
      postProductCart(context, { productOfferId, amount, colorId })
        .then((res) => {
          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    deleteProductCart(context, cartProductId) {
      deleteProductCartRequest(context, cartProductId)
        .then((res) => {
          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    // eslint-disable-next-line consistent-return
    updateCartProductAmount(context, { cartProductId, amount }) {
      context.commit('updateCartProductAmount', { cartProductId, amount });
      if (amount < 1) {
        return null;
      }
      putCartProductAmount(context, { cartProductId, amount })
        .then((res) => context.commit('updateCardProductsData', res.data.items))
        .catch(() => context.commit('syncCartProducts'));
    },
  },
});
