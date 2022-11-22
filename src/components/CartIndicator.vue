<template>
  <router-link
    class="header__cart"
    aria-label="Корзина с товарами"
    :to="{ name: 'cart' }"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span
      class="header__count"
      aria-label="Количество товаров"
      v-if="isLoaded"
      >{{ $store.state.cartProducts.length }}</span
    >
    <span class="header__count" aria-label="Количество товаров" v-else>
      <RollingLoader :width="10" :height="10" />
    </span>
  </router-link>
</template>

<script>
/* eslint-disable quotes */
import RollingLoader from "./RollingLoader.vue";

export default {
  props: ["isLoaded"],
  components: { RollingLoader },
};
</script>
