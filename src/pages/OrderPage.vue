<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <main class="content container" style="padding-bottom: 60px">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ getRightWord(products.length) }} </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              title="ФИО"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :error="formError.name"
            />

            <BaseFormText
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :error="formError.address"
            />

            <BaseFormText
              :isPhone="true"
              title="Телефон"
              placeholder="+7"
              v-model="formData.phone"
              :error="formError.phone"
              type="tel"
            />

            <BaseFormText
              title="Email"
              placeholder="Введите ваш Email"
              v-model="formData.email"
              :error="formError.email"
              type="email"
            />

            <BaseFormTextarea
              title="Комментарий к заказу"
              v-model="formData.comment"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <OrderOptionsBlock
              option-title="Доставка"
              :option-data="deliveryTypesData"
              :is-delivery-option="true"
              :option.sync="formData.deliveryTypeId"
            />

            <OrderOptionsBlock
              option-title="Оплата"
              :option-data="paymentsTypesData"
              :is-delivery-option="false"
              :option.sync="formData.paymentTypeId"
            />
          </div>
        </div>

        <aside class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(product, index) in products" :key="index">
              <h3>
                {{ product.product.title }}
                <b class="product-amount" v-show="product.amount > 1">x{{ product.amount }}</b>
              </h3>
              <b>{{ product.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total" v-if="deliveryTypesData">
            <p v-if="formData.deliveryTypeId == 2">
              {{ deliveryTypesData[1].title }}:
              <b>{{ deliveryTypesData[1].price }} ₽</b>
            </p>
            <p v-else>
              {{ deliveryTypesData[0].title }}:
              <b>бесплатно</b>
            </p>
            <p>
              Итого: {{ getRightWord(products.length) }} на сумму
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button
            class="cart__button button button--primery"
            type="submit"
            :disabled="orderResponseLoading"
          >
            <!-- Кнопка оформления заказа -->
            {{ orderResponseLoading ? submitBtnLoadingText : submitBtnDefaultText }}
            <RollingLoader
              v-show="orderResponseLoading"
              :width="40"
              :height="40"
              class="item__loader"
            />
          </button>
        </aside>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { mapGetters } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import axios from "axios";
// eslint-disable-next-line import/extensions
import getRightWord from "@/helpers/getRightWord";
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
import { API_BASE_URL } from "@/config";
import RollingLoader from "@/components/RollingLoader.vue";
import OrderOptionsBlock from "@/components/OrderOptionsBlock.vue";

export default {
  data() {
    return {
      formData: {
        deliveryTypeId: 1,
        paymentTypeId: 1,
      },
      formError: {},
      formErrorMessage: null,
      submitBtnDefaultText: "Оформить заказ",
      submitBtnLoadingText: "Оформляем заказ...",
      orderResponseLoading: false,
      deliveryTypesData: null,
      paymentsTypesData: null,
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    RollingLoader,
    OrderOptionsBlock,
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
  },
  methods: {
    order() {
      this.orderResponseLoading = true;
      this.formError = {};
      this.formErrorMessage = null;
      axios
        .post(
          `${API_BASE_URL}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: { userAccessKey: this.$store.state.userAccessKey },
            // eslint-disable-next-line comma-dangle
          }
        )
        .then((res) => {
          this.$store.commit("resetCart");
          this.$store.commit("updateOrderInfo", res.data);
          this.$router.push({ name: "orderInfo", params: { id: res.data.id } });
        })
        .catch((err) => {
          this.formError = err.response.data.error.request || {};
          this.formErrorMessage = err.response.data.error.message;
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.orderResponseLoading = false));
    },
    loadDeliveryTypes() {
      axios
        .get(`${API_BASE_URL}/api/deliveries`)
        // eslint-disable-next-line no-return-assign
        .then((res) => (this.deliveryTypesData = res.data));
    },
    loadPaymentsTypes() {
      axios
        .get(
          // eslint-disable-next-line comma-dangle
          `${API_BASE_URL}/api/payments?deliveryTypeId=${this.formData.deliveryTypeId}`
        )
        // eslint-disable-next-line no-return-assign
        .then((res) => (this.paymentsTypesData = res.data));
    },
    getRightWord,
  },
  filters: {
    numberFormat,
  },
  created() {
    this.loadDeliveryTypes();
    this.loadPaymentsTypes();
  },
};
</script>
