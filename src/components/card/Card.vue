<template>
  <div class="card-warpper" v-if="!!card">
    <h2>A card for {{ card.recipientName }}</h2>
    <div class="card">
      <Pages />
      <EditPage v-if="hasEditBlock" :block="editBlock" />
      <Controllers @new-block="onNewBlock" />
    </div>

    <Navigator />
  </div>
  <div class="card-wrapper" v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import { SET_ACTIVE_PAGE_NUMBER } from '@/store/mutation_types';
import Pages from './Pages.vue';
import EditPage from './EditPage.vue';
import Navigator from './Navigator.vue';
import Controllers from './Controllers.vue';
import { Block, Card as CardModel } from '@/store';

export default defineComponent({
  components: {
    Pages,
    EditPage,
    Navigator,
    Controllers
  },
  props: {
    cardId: {
      required: true,
      type: String
    },
    pageNumber: {
      required: true,
      type: Number
    }
  },
  computed: {
    pages() {
      return this.$store.getters.getPages();
    },
    editBlock(): Block {
      return this.$store.getters.getEditingBlock();
    },
    hasEditBlock(): boolean {
      return !!this.$store.getters.getEditingBlock();
    },
    card(): CardModel {
      return this.$store.getters.getCard();
    }
  },
  beforeMount() {
    this.$store.dispatch(GET_CARD, {
      cardId: this.cardId,
      activePageNumber: this.pageNumber || 1
    });
  },
  watch: {
    pageNumber(pageNumber) {
      console.log({ pageNumber });
      this.$store.commit(SET_ACTIVE_PAGE_NUMBER, {
        pageNumber
      });
    },
    cardId(cardId) {
      console.log({ cardId });
      this.$store.dispatch(GET_CARD, {
        cardId,
        activePageNumber: this.pageNumber || 1
      });
    }
  },
  methods: {
    blocksByPageId(pageId: string): Block[] {
      return this.$store.getters.getBlocksByPageID(pageId) as Block[];
    },
    onNewBlock(type: string) {
      this.$store.dispatch(CREATE_BLOCK, {
        type
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
.controllers {
  position: absolute;
  right: -200px;
  top: 20px;
}

h2 {
  text-align: center;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>
