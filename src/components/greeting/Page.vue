<template>
  <div class="page" ref="root" @click="selectPage">
    <div class="container">
      <WrapperBlock
        v-for="block in blocks"
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
    }
  },
  components: {
    WrapperBlock
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      this.$emit('pageSelected', this.pageIdx, this.pageId);
    }
  }
});
</script>

<style scoped>
.page {
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
}
.container {
  position: relative;
  border: 1px solid #cccccc;
  width: 500px;
  height: 500px;
}
</style>
