<template>
  <div class="card">
    <Pages />

    <EditPage v-if="hasEditBlock" :block="editBlock" />

    <div v-if="canShowControllers" class="controllers">
      <div style="margin-bottom: 20px">
        <button @click="newBlock">New Text</button>
      </div>
    </div>
    <Slider
      :tooltips="false"
      :modelValue="sliderValue"
      :min="1"
      :max="maxPage"
      :lazy="false"
      @update="onSliderChange"
    />
  </div>
</template>

<script lang="ts">
import Slider from '@vueform/slider';
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE } from '@/store/mutation_types';
import Pages from './Pages.vue';
import EditPage from './EditPage.vue';
import { Block, Page as ModelPage } from '@/store';

export default defineComponent({
  components: {
    Pages,
    EditPage,
    Slider
  },
  props: {
    activePageId: Number
  },
  computed: {
    pages() {
      return this.$store.getters.getPages();
    },
    maxPage() {
      let count = this.$store.getters.getPages().length;
      if (this.$store.getters.hasEditingBlock()) {
        count -= 1;
      }

      return Math.max(count, 0);
    },
    sliderValue() {
      return this.$store.getters.getActivePageIndex() + 1;
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
    },
    onSliderChange(index: number) {
      this.$store.commit(SET_ACTIVE_PAGE, {
        index: index - 1
      });
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.card {
  position: relative;
  margin: auto;
  width: 500px;
  margin-top: 200px;
}

.controllers {
  position: absolute;
  width: 100%;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>
