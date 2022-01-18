<template>
  <div class="card">
    <Page
      v-for="page in pages"
      :key="page.id"
      :page-id="page.id"
      @on-change="onChange"
    />

    <div v-if="canShowControllers">
      <button @click="newBlock">New Text</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CREATE_BLOCK, GET_CARD } from '@/store/action_types';
import Page from './Page.vue';

export default defineComponent({
  components: {
    Page
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    canShowControllers(): boolean {
      return !this.$store.getters.hasActiveBlockId();
    }
  },
  mounted() {
    this.$store.dispatch(GET_CARD, { cardId: '123' });
  },
  methods: {
    onChange(event: any) {
      console.log(event);
    },
    newBlock() {
      this.$store.dispatch(CREATE_BLOCK, {
        type: 'blocktext',
        cardId: 'card1',
        pageId: 'page1'
      });
    }
  }
});
</script>
<style scoped>
.card {
  padding: 100px;
}
</style>
