<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label  -->
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      name="comments"
      :placeholder="placeholder"
      v-model="dataValue"
    ></textarea>
  </BaseFormField>
</template>

<script>
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
};
</script>
