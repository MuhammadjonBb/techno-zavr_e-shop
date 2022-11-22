<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        href="#"
        aria-label="Предыдущая страница"
        @click.prevent="pagePrev(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="pageNext(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
/* eslint-disable quotes */
export default {
  props: ["page", "count", "perPage"],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    isNextDisabled() {
      return this.page === this.pages;
    },
    isPrevDisabled() {
      return this.page === 1;
    },
  },
  methods: {
    paginate(page) {
      this.$emit("update:page", page);
    },
    pageNext(page) {
      if (!this.isNextDisabled) this.$emit("update:page", page + 1);
    },
    pagePrev(page) {
      if (!this.isPrevDisabled) this.$emit("update:page", page - 1);
    },
  },
};
</script>
