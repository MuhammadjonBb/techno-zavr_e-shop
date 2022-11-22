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
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.code"
            v-model="currentColor"
          />
          <span
            class="colors__value"
            :class="{ 'color--white': color.code === '#fff' }"
            :style="background(color.code)"
          >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import numberFormat from "@/helpers/numberFormat";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      currentColor: this.product.colors[0].code,
    };
  },
  methods: {
    background(color) {
      return `background-color: ${color}`;
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
