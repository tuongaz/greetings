<template>
  <div class="card">
    <Pages />
    <EditPage v-if="hasEditBlock" :block="editBlock" />
  </div>

  <Controllers @new-block="onNewBlock" v-if="canShowControllers" />
  <Navigator @changed="onNavigatorChanged" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE } from '@/store/mutation_types';
import Pages from './Pages.vue';
import EditPage from './EditPage.vue';
import Navigator from './Navigator.vue';
import Controllers from './Controllers.vue';
import { Block, Page as ModelPage } from '@/store';

export default defineComponent({
  components: {
    Pages,
    EditPage,
    Navigator,
    Controllers
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
    onNewBlock(type: string) {
      this.$store.dispatch(CREATE_BLOCK, {
        type
      });
    },
    onPageSelected(pageId: number) {
      this.$store.commit(SET_ACTIVE_PAGE, {
        pageId
      });
    },
    onNavigatorChanged(index: number) {
      this.$store.commit(SET_ACTIVE_PAGE, {
        index
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
  width: 450px;
  height: 550px;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>
