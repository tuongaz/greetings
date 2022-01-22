<template>
  <div class="pages">
    <Page
      v-for="(page, idx) in pages"
      :key="idx"
      :page="page"
      @page-selected="onPageSelected"
      :blocks="blocksByPageId(page.id)"
      :class="{
        [page.className]: true,
        [page.type]: true
      }"
    />
  </div>
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
      const pages = this.$store.getters.getPages() as ModelPage[];
      const activePage = this.$store.getters.getActivePage() as ModelPage;

      let className = 'left-active';
      let previousActive = false;
      for (let i = 0; i < pages.length; i += 1) {
        const page = pages[i];
        if (page.id === activePage.id) {
          className = 'right-active';
          pages[i] = { ...page, className: 'active' };
          if (i > 0) {
            pages[i - 1].className += ' next-active';
          }
          previousActive = true;
        } else {
          pages[i] = { ...page, className };
          if (previousActive) {
            previousActive = false;
            pages[i].className += ' next-active';
          }
        }
      }

      return pages;
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

.pages {
  height: 100%;
  width: 100%;
}
</style>
