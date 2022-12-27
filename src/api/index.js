import { API_BASE_URL } from '@/config';
import axios from 'axios';

export function getCart(context) {
  context.commit('updadeIsCartLoading');
  return axios
    .get(`${API_BASE_URL}/api/baskets`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    });
}

export function getOrderInfo(context, orderId) {
  return axios
    .get(`${API_BASE_URL}/api/orders/${orderId}`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    });
}

export function postProductCart(context, { productOfferId, amount, colorId }) {
  return axios
    .post(`${API_BASE_URL}/api/baskets/products`, {
      productOfferId,
      quantity: amount,
      colorId,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    });
}
export function deleteProductCartRequest(context, cartProductId) {
  context.commit('deleteCartProduct', cartProductId);

  return axios
    .delete(`${API_BASE_URL}/api/baskets/products`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        basketItemId: cartProductId,
      },
    });
}
export function putCartProductAmount(context, { cartProductId, amount }) {
  return axios
    .put(`${API_BASE_URL}/api/baskets/products`, {
      basketItemId: cartProductId,
      quantity: amount,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    });
}
