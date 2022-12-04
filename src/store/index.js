/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

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
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productId === productId);
      if (item) item.amount = amount;
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
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
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line max-len
        const product = state.cartProductsData.find((p) => p.productOffer.id === item.productOfferId).productOffer;
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
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateOrderInfo', res.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductCart(context, { productOfferId, amount, colorId }) {
      return axios
        .post(`${API_BASE_URL}/api/baskets/products`, {
          productOfferId,
          quantity: amount,
          colorId,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    deleteProductCart(context, productId) {
      context.commit('deleteCartProduct', productId);

      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        }).then((res) => {
          context.commit('updateCardProductsData', res.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return null;
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          context.commit('updateCardProductsData', res.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
