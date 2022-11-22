<template>
  <button
    type="button"
    aria-label="Убрать один товар"
    @click.prevent="decrement(amount)"
  >
    <svg width="10" height="10" fill="currentColor">
      <use xlink:href="#icon-minus"></use>
    </svg>
  </button>
</template>

<script>
/* eslint-disable quotes */
export default {
  props: ["amount"],
  model: {
    prop: "amount",
    event: "decrement",
  },
  methods: {
    decrement(amount) {
      if (amount > 1) this.$emit("update:amount", amount - 1);
    },
  },
};
</script>
