<template>
  <Page
    v-for="(page, idx) in pages"
    :key="idx"
    :page="page"
    @page-selected="onPageSelected"
    :blocks="blocksByPageId(page.id)"
    :class="{
      active: idx === currentPageId,
      'right-active': idx > currentPageId,
      [page.type]: true,
      'left-active': idx < currentPageId,
      'next-active': idx === currentPageId + 1 || idx === currentPageId - 1
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE } from '@/store/mutation_types';
import Page from './Page.vue';
import { Block, Page as ModelPage } from '@/store';

export default defineComponent({
  components: {
    Page
  },
  props: {
    activePageId: Number
  },
  computed: {
    pages() {
      return this.$store.getters.getPages();
    },
    canShowControllers(): boolean {
      const activePage: ModelPage = this.$store.getters.getActivePage();
      if (!activePage) {
        return false;
      }

      return (
        !this.$store.getters.hasEditingBlock() &&
        activePage.type !== 'front' &&
        activePage.type !== 'back'
      );
    },
    editBlock(): Block {
      return this.$store.getters.getEditingBlock();
    },
    hasEditBlock(): boolean {
      return !!this.$store.getters.getEditingBlock();
    },
    currentPageId(): number {
      return this.$store.state.app.activePageId || 0;
    }
  },
  mounted() {
    this.$store.dispatch(GET_CARD);
    this.$store.commit(SET_ACTIVE_PAGE, {
      pageId: this.activePageId
    });
  },
  methods: {
    blocksByPageId(pageId: string): Block[] {
      return this.$store.getters.getBlocksByPageID(pageId) as Block[];
    },
    newBlock() {
      this.$store.dispatch(CREATE_BLOCK, {
        type: 'blocktext'
      });
    },
    onPageSelected(pageId: number) {
      this.$store.commit(SET_ACTIVE_PAGE, {
        pageId
      });
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
.page.active {
  z-index: 10;
}

.page {
  z-index: 1;
}

.next-active {
  z-index: 5;
}

.right-active {
  cursor: pointer;
  @include transform(translateX(25%) scale(0.8));
  @include no-text-select();
}

.left-active {
  @include transform(translateX(-25%) scale(0.8));
  @include no-text-select();
  cursor: pointer;
}

.front,
.back {
  background: #eee;
}
</style>
