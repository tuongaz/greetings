<template>
  <div v-if="visible" class="page" ref="root" @click="selectPage">
    <div class="container">
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
import { Block, Page } from '@/store';

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
        width: 500,
        height: 500
      };
    },
    visible() {
      return !(
        (this.page.type === 'front' || this.page.type === 'back') &&
        this.$store.getters.hasEditingBlock()
      );
    }
  },
  components: {
    WrapperBlock
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      this.$emit('pageSelected', this.page.id);
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
