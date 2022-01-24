<template>
  <div class="pages">
    <PageCover
      v-if="coverPage"
      :page="coverPage"
      @page-selected="onPageSelected"
    />
    <Page
      v-for="(page, idx) in contentPages"
      :key="idx"
      :page="page"
      @page-selected="onPageSelected"
      :blocks="blocksByPageId(page.id)"
      :class="{
        [page.className]: true,
        [page.type]: true
      }"
    />
    <PageBack
      v-if="backPage"
      :page="backPage"
      @page-selected="onPageSelected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from './Page.vue';
import PageCover from './PageCover.vue';
import PageBack from './PageBack.vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE } from '@/store/mutation_types';
import { backPageId, Block, coverPageId, Page as ModelPage } from '@/store';

export default defineComponent({
  components: {
    Page,
    PageCover,
    PageBack
  },
  props: {
    activePageId: Number
  },
  computed: {
    coverPage() {
      return this.$store.getters.coverPage();
    },
    backPage() {
      return this.$store.getters.backPage();
    },
    contentPages() {
      const contentPages = this.$store.getters.contentPages();
      const activePage = this.$store.getters.getActivePage() as ModelPage;
      if (!activePage) {
        return [];
      }

      if (activePage.id === coverPageId) {
        let previousActive = true;
        // cover page
        for (let i = 0; i < contentPages.length; i += 1) {
          const className = 'right-active';

          const page = contentPages[i];
          contentPages[i] = { ...page, className };
          if (previousActive) {
            previousActive = false;
            contentPages[i].className += ' next-active';
          }
        }

        return contentPages;
      }

      if (activePage.id === backPageId) {
        // back page
        for (let i = 0; i < contentPages.length; i += 1) {
          const className = 'left-active';

          const page = contentPages[i];
          contentPages[i] = { ...page, className };
          if (i === contentPages.length - 1) {
            contentPages[i].className += ' next-active';
          }
        }

        return contentPages;
      }

      let className = 'left-active';
      let previousActive = false;
      for (let i = 0; i < contentPages.length; i += 1) {
        const page = contentPages[i];

        if (page.id === activePage.id) {
          contentPages[i] = { ...page, className: 'active' };

          if (i > 1) {
            contentPages[i - 1].className += ' next-active';
          }

          previousActive = true;
          className = 'right-active';
        } else {
          contentPages[i] = { ...page, className };
          if (previousActive) {
            previousActive = false;
            contentPages[i].className += ' next-active';
          }
        }
      }

      return contentPages;
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

<style lang="scss">
@import '@/assets/scss/mixins.scss';

.pages {
  height: 100%;
  width: 100%;
}

.page {
  position: absolute;
  background: rgb(245, 245, 245);
  top: 0;
  left: 0;
  @include transition(0.4s, ease-in-out);
}

.page-container {
  position: relative;
  border: 1px solid #cccccc;
  width: 450px;
  height: 550px;
  overflow: hidden;
}

.page.active {
  z-index: 10;
  @include transition(0.4s, ease-in-out);
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
  @include transition(0.4s, ease-in-out);
}

.left-active {
  cursor: pointer;
  @include transform(translateX(-25%) scale(0.8));
  @include no-text-select();
  @include transition(0.4s, ease-in-out);
}

.front,
.back {
  background: #eee;
}
</style>
