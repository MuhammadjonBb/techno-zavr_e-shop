<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit()"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="checkbox"
                :value="color.code"
                @click="pushColor(color.title)"
              />
              <span class="colors__value" :style="background(color.code)">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="!categoryDataLoadingStatus">
        <legend class="form__legend">
          {{
            currentCategoryData?.productProps.length
              ? currentCategoryData?.productProps[0]?.title
              : "Нет дополнительных характеристик"
          }}
        </legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="(value, index) in currentCategoryData?.productProps[0]
              ?.availableValues"
            :key="index"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                :value="value?.value"
                @click="pushPropValue(value?.value)"
              />
              <span class="check-list__desc">
                {{ value?.value }}
                <span>({{ value?.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        v-show="displayResetBtn"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset()"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
/* eslint-disable quotes */
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  props: [
    "productList",
    "priceFrom",
    "priceTo",
    "categoryId",
    "page",
    "colorArr",
    "propValues",
    "propCode",
  ],
  data() {
    return {
      currentPriceFrom: null,
      currentPriceTo: null,
      currentCategoryId: 0,
      currentCategoryData: null,
      categoryDataLoadingStatus: "null",
      currentColorArr: [],
      currentProp: null,
      currentPropValues: [],
      currentPropCode: null,
      categoriesData: null,
      colorsData: null,
      displayResetBtn: false,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
      this.displayResetBtn = true;
    },
    priceTo(value) {
      this.currentPriceTo = value;
      this.displayResetBtn = true;
    },
    categoryId(value) {
      this.currentCategoryId = value;
      this.displayResetBtn = true;
    },
    currentCategoryId: "getCurrentCategoryData",
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorArr", this.currentColorArr);
      this.$emit("update:propValues", this.currentPropValues);
      this.$emit("update:propCode", this.currentPropCode);
      this.$emit("update:page", 1);
    },
    reset() {
      this.$emit("update:priceFrom", null);
      this.$emit("update:priceTo", null);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorArr", null);
      this.$emit("update:propValues", null);
      this.categoryDataLoadingStatus = "null";
      this.displayResetBtn = false;
    },
    background(color) {
      return `background-color: ${color}`;
    },
    loadCategories() {
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        // eslint-disable-next-line no-return-assign
        .then((res) => (this.categoriesData = res.data));
    },
    loadColors() {
      axios
        .get(`${API_BASE_URL}/api/colors`)
        // eslint-disable-next-line no-return-assign
        .then((res) => {
          this.colorsData = res.data;
        });
    },
    pushColor(color) {
      this.displayResetBtn = true;
      if (this.currentColorArr.includes(color)) {
        this.currentColorArr = this.currentColorArr.filter(
          // eslint-disable-next-line comma-dangle
          (thisColor) => thisColor !== color
        );
      } else this.currentColorArr.push(color);
    },
    pushPropValue(value) {
      if (this.currentPropValues.includes(value)) {
        this.currentPropValues = this.currentPropValues.filter(
          // eslint-disable-next-line comma-dangle
          (propValue) => propValue !== value
        );
      } else this.currentPropValues.push(value);
    },
    getCurrentCategoryData() {
      if (this.currentCategoryId === 0) return;
      this.categoryDataLoadingStatus = true;
      this.currentPropValues = [];
      axios
        .get(`${API_BASE_URL}/api/productCategories/${this.currentCategoryId}`)
        // eslint-disable-next-line no-return-assign
        .then((res) => {
          this.currentCategoryData = res.data;
          this.currentPropCode = res.data.productProps[0]?.code;
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => {
          this.categoryDataLoadingStatus = false;
          this.displayResetBtn = true;
        });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
