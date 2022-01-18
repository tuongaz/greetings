<template>
  <div class="card">
    <Page
      v-for="(page, idx) in pages"
      :key="idx"
      :page-id="page.id"
      :page-idx="idx"
      @page-selected="onPageSelected"
      :isActive="idx === currentPageIndex"
      :blocks="blocksByPageId(page.id)"
      :class="{
        active: idx === currentPageIndex,
        'right-active': idx > currentPageIndex,
        'left-active': idx < currentPageIndex,
        'next-active':
          idx === currentPageIndex + 1 || idx === currentPageIndex - 1
      }"
    />

    <EditPage />

    <div v-if="canShowControllers" class="controllers">
      <button @click="newBlock">New Text</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import Page from './Page.vue';
import EditPage from './EditPage.vue';
import { Block } from '@/store';

export default defineComponent({
  components: {
    Page,
    EditPage
  },
  props: {
    cardId: String
  },
  computed: {
    pages() {
      return this.$store.getters.getPages();
    },
    canShowControllers(): boolean {
      return !this.$store.getters.hasActiveBlockId();
    }
  },
  mounted() {
    this.$store.dispatch(GET_CARD, { cardId: this.cardId });
  },
  data() {
    return {
      currentPageIndex: 1
    };
  },
  methods: {
    blocksByPageId(pageId: string): Block[] {
      return this.$store.getters.getBlocksByPageID(pageId) as Block[];
    },
    newBlock() {
      this.$store.dispatch(CREATE_BLOCK, {
        type: 'blocktext',
        cardId: this.cardId
      });
    },
    onPageSelected(idx: number) {
      this.currentPageIndex = idx;
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.card {
  position: relative;
  height: 500px;
  margin: 150px 0 0 250px;
}

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

.controllers {
  position: absolute;
  bottom: -30px;
}
</style>
