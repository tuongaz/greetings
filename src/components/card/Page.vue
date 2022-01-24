<template>
  <div class="page" @click="selectPage">
    <div class="page-container">
      <WrapperBlock
        v-for="block in blocks"
        :bound="bound"
        :readonly="false"
        :key="block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WrapperBlock from './Block.vue';
import { backPageId, Block, coverPageId, Page } from '@/store';

export default defineComponent({
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true
    },
    blocks: Object as PropType<Block[]>
  },
  computed: {
    bound() {
      return {
        width: 450,
        height: 550
      };
    }
  },
  components: {
    WrapperBlock
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      if (!this.canSelect()) {
        return;
      }

      this.$emit('pageSelected', this.page.id);
    },
    canSelect() {
      return !(
        (this.page.id === coverPageId || this.page.id === backPageId) &&
        this.$store.getters.hasEditingBlock()
      );
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
</style>
