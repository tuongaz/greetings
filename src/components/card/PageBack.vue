<template>
  <div :class="classNames" @click="selectPage">
    <div class="page-container">Back</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Page as ModelPage } from '@/store';

export default defineComponent({
  props: {
    page: {
      type: Object as PropType<ModelPage>,
      required: true
    }
  },
  computed: {
    bound() {
      return {
        width: 450,
        height: 550
      };
    },
    classNames() {
      const activePage = this.$store.getters.getActivePage() as ModelPage;
      const pages = this.$store.getters.getPages();
      const isNextActive = pages[pages.length - 2].id === activePage.id;

      return {
        page: true,
        back: true,
        'right-active': activePage.id !== this.page.id,
        'next-active': isNextActive,
        active: activePage.id === this.page.id
      };
    }
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      if (!this.canSelect()) {
        return;
      }

      this.$emit('pageSelected', this.page.id);
    },
    canSelect() {
      return !this.$store.getters.hasEditingBlock();
    }
  }
});
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';

.page.back {
  background: #eee;
}
</style>
