<template>
  <div :class="classNames" @click="selectPage">
    <div class="page-container">
      <img :src="page.image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Page, Page as ModelPage } from '@/store';

export default defineComponent({
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true
    }
  },
  computed: {
    classNames() {
      const activePage = this.$store.getters.getActivePage() as ModelPage;

      return {
        page: true,
        cover: true,
        'left-active': activePage.id !== this.page.id,
        active: activePage.id === this.page.id
      };
    },
    bound() {
      return {
        width: 450,
        height: 550
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
