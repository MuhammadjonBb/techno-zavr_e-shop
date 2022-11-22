<template>
  <button
    type="button"
    aria-label="Добавить один товар"
    @click.prevent="increment(amount)"
  >
    <svg width="10" height="10" fill="currentColor">
      <use xlink:href="#icon-plus"></use>
    </svg>
  </button>
</template>

<script>
/* eslint-disable quotes */

export default {
  props: ["amount"],
  model: {
    prop: "amount",
    event: "increment",
  },
  methods: {
    increment(amount) {
      this.$emit("update:amount", amount + 1);
    },
  },
};
</script>
