<template>
  <div class="page" ref="root" @click="selectPage">
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
        (this.page.type === 'front' || this.page.type === 'back') &&
        this.$store.getters.hasEditingBlock()
      );
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.page {
  position: absolute;
  background: #eee;
  top: 0;
  left: 0;
  @include transition(0.4s, ease-in-out);
}

.container {
  position: relative;
  border: 1px solid #cccccc;
  width: 500px;
  height: 500px;
}

.page.active {
  z-index: 10;
  @include transition(0.4s, ease-in-out);
}

.page {
  z-index: 1;
}

.next-active {
  z-index: 5;
}

.right-active {
  cursor: pointer;
  @include transform(translateX(25%) scale(0.8));
  @include no-text-select();
  @include transition(0.4s, ease-in-out);
}

.left-active {
  cursor: pointer;
  @include transform(translateX(-25%) scale(0.8));
  @include no-text-select();
  @include transition(0.4s, ease-in-out);
}

.front,
.back {
  background: #eee;
}
</style>
