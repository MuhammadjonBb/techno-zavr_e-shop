<template>
  <li class="dictionary__item">
    <span class="dictionary__key"> {{ title }} </span>
    <span class="dictionary__value"> {{ value }} </span>
  </li>
</template>

<script>
/* eslint-disable quotes */
export default {
  props: ["title", "value"],
};
</script>
