/* eslint-disable quotes */
// eslint-disable-next-line import/no-unresolved
import BaseFormField from "@/components/BaseFormField.vue";

export default {
  props: ["title", "error", "placeholder", "value"],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
