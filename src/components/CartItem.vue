<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <div class="product__info">
      <p class="product__info-item" v-show="item.product.product.mainProp.id !== 7">
        Цвет:
        <span>{{ color }}</span>
      </p>
      <p class="product__info-item">
        {{ item.product.product.mainProp.title }}:
        <span>{{ item.product.propValues[0].value }}</span>
      </p>
    </div>
    <span class="product__code"> Артикул: {{ item.productOfferId }} </span>

    <div class="product__counter form__counter">
      <DecrementAmount :amount.sync="amount" />
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
      <input type="number" v-model.number="amount" name="count" class="disable-input-arrows" />

      <IncrementAmount :amount.sync="amount" />
    </div>

    <b class="product__price"> {{ (item.amount * item.product.price) | numberFormat }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProductCart(item.cartProductId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";
import IncrementAmount from "./IncrementAmount.vue";
import DecrementAmount from "./DecrementAmount.vue";

export default {
  components: { IncrementAmount, DecrementAmount },
  filters: { numberFormat },
  props: ["item"],
  computed: {
    color() {
      // eslint-disable-next-line max-len
      return this.item.product.product.colors.find((color) => color.id === this.item.colorId).color
        .title;
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCartProductAmount", {
          cartProductId: this.item.cartProductId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(["deleteProductCart"]),
  },
};
</script>
<style>
.product__info-item {
  margin: 0;
}

.product__info-item:not(:last-child) {
  margin-bottom: 5px;
}
</style>
