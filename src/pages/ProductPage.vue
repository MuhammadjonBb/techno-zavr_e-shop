<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <div>
    <main v-if="productLoading" class="product-page-loader">
      <PulseLoader />
    </main>
    <main v-else-if="!productData">
      <not-found-page page-name="product-page" />
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ product.category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ product.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="product.image.file.url"
              :alt="product.title"
            />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form
              class="form"
              action="#"
              method="POST"
              @submit.prevent="addToCart"
            >
              <b class="item__price"> {{ product.price | numberFormat }} ₽</b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li
                    class="colors__item"
                    v-for="color in product.colors"
                    :key="color.id"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        :value="color.code"
                        v-model="currentColor"
                      />
                      <span
                        class="colors__value"
                        :style="background(color.code)"
                      >
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset
                class="form__block"
                v-show="product.category.title === 'Телефоны'"
              >
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="32"
                      />
                      <span class="sizes__value"> 32gb </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="64"
                      />
                      <span class="sizes__value"> 64gb </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="128"
                        checked=""
                      />
                      <span class="sizes__value"> 128gb </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <DecrementAmount :amount.sync="productAmount" />
                  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                  <input type="text" v-model.number="productAmount" />
                  <IncrementAmount :amount.sync="productAmount" />
                </div>

                <button
                  class="button button--primery"
                  :disabled="productAddSending"
                  type="submit"
                >
                  В корзину
                  <RollingLoader
                    v-show="productAddSending"
                    :width="40"
                    :height="40"
                    class="item__loader"
                  />
                </button>
                <div v-show="productAdded">Товар добавлен в корзину</div>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current"> Описание </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Характеристики </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Гарантия </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Оплата и доставка </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
              Синхронизация со смартфоном<br />
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
              Поддержка сторонних приложений<br />
            </p>

            <a href="#"> Все характеристики </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
              оптимизировать свои велотренировки, сделав их максимально
              эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками
              по ANT+, объединяя полученную с них информацию. Данные
              отображаются на дисплее, а также сохраняются на смартфоне. При
              этом на мобильное устройство можно установить как фирменное
              приложение, так и различные приложения сторонних разработчиков.
              Велокомпьютер точно отслеживает местоположение, принимая сигнал с
              целого комплекса спутников. Эта информация позволяет смотреть уже
              преодоленные маршруты и планировать новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры
              устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не
              превышает габариты смартфона. Корпус гаджета выполнен из черного
              пластика. На обращенной к пользователю стороне расположен дисплей
              диагональю 56 мм. На дисплей выводятся координаты и скорость, а
              также полученная со смартфона и синхронизированных датчиков
              информация: интенсивность, скорость вращения педалей, пульс и т.д.
              (датчики не входят в комплект поставки). Корпус велокомпьютера
              имеет степень защиты от влаги IPX7. Это означает, что устройство
              не боится пыли, а также выдерживает кратковременное (до 30 минут)
              погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
import axios from "axios";
import numberFormat from "@/helpers/numberFormat";
import { mapActions } from "vuex";
import DecrementAmount from "@/components/DecrementAmount.vue";
import IncrementAmount from "@/components/IncrementAmount.vue";
import PulseLoader from "@/components/PulseLoader.vue";
import RollingLoader from "@/components/RollingLoader.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { API_BASE_URL } from "../config";

export default {
  components: {
    DecrementAmount,
    IncrementAmount,
    PulseLoader,
    RollingLoader,
    NotFoundPage,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      currentColor: null,
      productAdded: false,
      productAddSending: false,
    };
  },
  computed: {
    product() {
      return this.productData;
    },
  },
  methods: {
    ...mapActions(["addProductCart"]),
    background(color) {
      return `background-color: ${color}`;
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductCart({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((res) => {
          this.productData = res.data;
          this.currentColor = res.data.colors[0].code;
        })
        .catch(() => (this.productLoadingFailed = true))
        .finally(() => (this.productLoading = false));
    },
  },
  filters: {
    numberFormat,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
