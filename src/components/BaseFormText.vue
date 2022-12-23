<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label  -->
  <BaseFormField :title="title" :error="error">
    <TheMask
      :mask="'+7 (###) ###-##-##'"
      :masked="true"
      v-model="dataValue"
      class="form__input"
      v-if="isPhone"
      :placeholder="placeholder"
      :type="type"
    />
    <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataValue" v-else />
  </BaseFormField>
</template>

<script>
/* eslint-disable quotes */
import formFieldMixin from "@/mixins/formFieldMixin";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TheMask } from "vue-the-mask";

export default {
  components: { TheMask },
  props: {
    type: {
      default: "text",
    },
    isPhone: {
      default: false,
    },
  },
  mixins: [formFieldMixin],
};
</script>
