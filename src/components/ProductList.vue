<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.id"
    />
  </ul>
</template>

<script>
// eslint-disable-next-line quotes
import ProductItem from "./ProductItem.vue";

export default {
  // eslint-disable-next-line quotes
  props: ["products"],
  components: { ProductItem },
};
</script>
