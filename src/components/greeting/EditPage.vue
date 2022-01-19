<template>
  <div class="edit-page">
    <div class="container">
      <WrapperBlock
        :bound="bound"
        :readonly="false"
        :editing="true"
        :key="block.id"
        :block="block"
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
    block: Object as PropType<Block>
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
