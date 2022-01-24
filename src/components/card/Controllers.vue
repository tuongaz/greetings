<template>
  <div v-if="visible" class="controllers">
    <button @click="newTextBlock">New Text</button>
    <button @click="newImageBlock">New Image</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { backPageId, coverPageId, Page as ModelPage } from '@/store';

export default defineComponent({
  methods: {
    newTextBlock() {
      this.$emit('newBlock', 'blocktext');
    },
    newImageBlock() {
      this.$emit('newBlock', 'blockimage');
    }
  },
  computed: {
    visible(): boolean {
      const activePage: ModelPage = this.$store.getters.getActivePage();
      if (!activePage) {
        return false;
      }

      return (
        !this.$store.getters.hasEditingBlock() &&
        activePage.id !== coverPageId &&
        activePage.id !== backPageId
      );
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
button {
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
  background: rgb(0, 143, 209);
  color: #fff;
  width: 100%;
}

.controllers {
  width: 120px;
  display: block;
}
</style>
