<template>
  <div class="pages">
    <PageCover />
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
    <PageBack />

    <Controllers
      class="controllers"
      @new-block="onNewBlock"
      v-if="canShowControllers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE } from '@/store/mutation_types';
import Page from './Page.vue';
import PageCover from './PageCover.vue';
import PageBack from './PageBack.vue';
import Controllers from './Controllers.vue';
import { Block, Page as ModelPage } from '@/store';

export default defineComponent({
  components: {
    Page,
    PageCover,
    PageBack,
    Controllers
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

      return !this.$store.getters.hasEditingBlock();
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
    },
    onNewBlock(type: string) {
      this.$store.dispatch(CREATE_BLOCK, {
        type
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
  background: #eee;
  top: 0;
  left: 0;
  @include transition(0.4s, ease-in-out);
}

.page-container {
  position: relative;
  border: 1px solid #cccccc;
  width: 450px;
  height: 550px;
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

.controllers {
  position: absolute;
  right: -200px;
  top: 20px;
}
</style>
