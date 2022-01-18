<template>
  <div class="edit-page">
    <div class="container">
      <WrapperBlock
        :bound="bound"
        :readonly="false"
        :key="block.id"
        :block="block"
        :isActive="isActive"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WrapperBlock from './Block.vue';
import { Block } from '@/store';

export default defineComponent({
  props: {
    pageId: String,
    pageIdx: Number,
    isActive: Boolean,
    blocks: Object as PropType<Block[]>
  },
  computed: {
    bound() {
      return {
        width: 500,
        height: 500
      };
    },
    block() {
      return {
        id: 'block2',
        cardId: 'card1',
        pageId: 'page1',
        type: 'blocktext',
        top: 100,
        left: 100,
        width: 200,
        text: 'Hello world 2',
        editable: true,
        fontFamily: 'Arial',
        fontColor: '#8e24aa',
        textAlign: 'right'
      };
    }
  },
  components: {
    WrapperBlock
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      this.$emit('pageSelected', this.pageIdx);
    }
  }
});
</script>
<style lang="scss" scoped>
.edit-page {
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>
