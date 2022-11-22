<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <OrderInfoItem title="Получатель" :value="orderInfo.name" />
            <OrderInfoItem title="Адрес доставки" :value="orderInfo.address" />
            <OrderInfoItem title="Телефон" :value="orderInfo.phone" />
            <OrderInfoItem title="Email" :value="orderInfo.email" />
            <OrderInfoItem title="Способ оплаты" value="картой при получении" />
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              class="cart__order"
              v-for="item in orderInfo.basket.items"
              :key="item.id"
            >
              <h3>
                {{ item.product.title }}
                <b class="product-amount" v-show="item.quantity > 1"
                  >x{{ item.quantity }}</b
                >
              </h3>
              <b> {{ item.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: {{ getRightWord(orderInfo.basket.items.length) }} на сумму
              <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
/* eslint-disable quotes */
import numberFormat from "@/helpers/numberFormat";
import getRightWord from "@/helpers/getRightWord";
import OrderInfoItem from "@/components/OrderInfoItem.vue";

export default {
  components: { OrderInfoItem },
  created() {
    if (
      // eslint-disable-next-line operator-linebreak
      !this.$store.state.orderInfo &&
      this.$store.state.orderInfo !== this.$route.params.id
    ) {
      this.$store.dispatch("loadOrderInfo", this.$route.params.id);
    }
  },
  methods: {
    getRightWord,
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
