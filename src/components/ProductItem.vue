<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ isProductOffers ? currentProp.title : product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ currentProp.price | numberFormat }} ₽
    </span>

    <ul class="sizes" v-if="isProductOffers">
      <li class="sizes__item" v-for="prop in product.offers" :key="prop.id">
        <label class="sizes__label">
          <input
            class="sizes__radio sr-only"
            type="radio"
            :value="prop.propValues[0].value"
            v-model="currentProp.prop"
            @click="showCurrProductData(prop)"
          />
          <span class="sizes__value"> {{ prop.propValues[0].value }} </span>
        </label>
      </li>
    </ul>
    <ul class="colors colors--black" v-else>
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.color.code"
            v-model="currentColor"
          />
          <span
            class="colors__value"
            :class="{ 'color--white': color.color.code === '#fff' }"
            :style="background(color.color.code)"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import numberFormat from "@/helpers/numberFormat";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      currentColor: this.product.colors[0].color.code,
      currentProp: {
        prop: this.product.offers[0].propValues[0].value,
        title: this.product.offers[0].title,
        price: this.product.offers[0].price,
      },
    };
  },
  methods: {
    background(color) {
      return `background-color: ${color}`;
    },
    showCurrProductData(value) {
      this.currentProp.title = value.title;
      this.currentProp.price = value.price;
    },
  },
  filters: {
    numberFormat,
  },
  computed: {
    isProductOffers() {
      return (
        this.product.mainProp.id === 6 ||
        this.product.mainProp.id === 9 ||
        this.product.mainProp.id === 10 ||
        this.product.mainProp.id === 11 ||
        this.product.mainProp.id === 12
      );
    },
  },
};
</script>
