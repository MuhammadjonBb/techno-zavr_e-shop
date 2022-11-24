<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info" v-if="countProducts > 0">
        Мы нашли {{ getRightWord(countProducts) }}
      </span>
      <span class="content__info" v-else> Список товаров пуст </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
        :color-id.sync="filterColorId"
        :page.sync="page"
      />

      <section class="catalog">
        <pulse-loader v-show="productsLoading" />
        <div v-show="productsLoadingFailed" class="page-failed">
          <h2 class="page-failed__title">Произошла ошибка :(</h2>
          <p class="page-failed__tip">Попробуйте повторить попытку позже...</p>
          <button @click.prevent="loadProducts" class="button button--primery">
            Попробовать снова
          </button>
        </div>
        <ProductList :products="products" :class="{ blur5: productsLoading }" />

        <BasePagination
          :page.sync="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-unresolved */
import axios from "axios";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import PulseLoader from "@/components/PulseLoader.vue";
import getRightWord from "@/helpers/getRightWord";
// eslint-disable-next-line import/extensions
import { API_BASE_URL } from "@/config";

export default {
  // eslint-disable-next-line quotes
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    PulseLoader,
  },
  data() {
    return {
      filterPriceFrom: null,
      filterPriceTo: null,
      filterCategoryId: null,
      filterColor: "#",
      filterColorId: null,
      filterProps: [],
      page: 1,
      productsPerPage: 12,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
            ...product,
            image: product.preview.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              colorId: this.filterColorId,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              props: this.filterProps,
            },
          })
          .then((res) => (this.productsData = res.data))
          .catch(() => (this.productsLoadingFailed = true))
          .finally(() => (this.productsLoading = false));
      }, 0);
    },
    getRightWord,
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
