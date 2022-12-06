<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for  -->
  <div>
    <h3 class="cart__title">{{ optionTitle }}</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="item in optionData" :key="item.id">
        <label class="options__label">
          <input
            class="options__radio sr-only"
            type="radio"
            :value="item.id"
            v-model="currentOption"
            @input="$emit('update:option', parseInt($event.target.value))"
          />
          <span class="options__value">
            {{ item.title }}
            <b v-if="isDeliveryOption">{{
              item.price > 0 ? `${item.price} ₽` : "бесплатно"
            }}</b>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable quotes */
export default {
  props: ["optionTitle", "optionData", "isDeliveryOption", "option"],
  data() {
    return {
      currentOption: 1,
    };
  },
};
</script>
