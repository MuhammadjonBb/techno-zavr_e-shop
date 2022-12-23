import { API_BASE_URL } from '@/config';
import axios from 'axios';

export function loadCart(context) {
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
}

export function loadOrderInfo(context, orderId) {
  return axios
    .get(`${API_BASE_URL}/api/orders/${orderId}`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
    .then((res) => {
      context.commit('updateOrderInfo', res.data);
    });
}

export function addProductCart(context, { productOfferId, amount, colorId }) {
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
}
export function deleteProductCart(context, cartProductId) {
  context.commit('deleteCartProduct', cartProductId);

  return axios
    .delete(`${API_BASE_URL}/api/baskets/products`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        basketItemId: cartProductId,
      },
    }).then((res) => {
      context.commit('updateCardProductsData', res.data.items);
      context.commit('syncCartProducts');
    })
    .catch(() => {
      context.commit('syncCartProducts');
    });
}
export function updateCartProductAmount(context, { cartProductId, amount }) {
  context.commit('updateCartProductAmount', { cartProductId, amount });

  if (amount < 1) {
    return null;
  }
  return axios
    .put(`${API_BASE_URL}/api/baskets/products`, {
      basketItemId: cartProductId,
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
}
