<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label  -->
  <BaseFormField :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </BaseFormField>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  props: {
    type: {
      default: "text",
    },
  },
  mixins: [formFieldMixin],
};
</script>
