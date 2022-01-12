<template>
  <div
    class="block"
    v-bind:class="{ editing: editing, editable: block.editable && !editing }"
    ref="root"
    @mousedown="onMouseDown"
  >
    <div class="container">
      <component
        :is="block.type"
        :block="block"
        ref="block"
        :editing="editing"
        @editing="editing = true"
        @block-value-changed="onBlockValueChanged"
      />
    </div>
    <div
      v-if="this.editing"
      class="resize-left resize"
      @mousedown="onBlockLeftResized"
    >
      Resize Left
    </div>
    <div
      v-if="this.editing"
      class="resize-right resize"
      @mousedown="onBlockRightResized"
    >
      Resize Right
    </div>
    <div v-if="this.editing" class="save-block">
      <button @click="saveBlock()">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, h } from 'vue';
import BlockText from './block/text/BlockText.vue';
import { Block } from '@/store';
import { pxToInt } from '@/util';

export default defineComponent({
  components: {
    BlockText
  },
  props: {
    component: String,
    block: {
      type: Object as PropType<Block>,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      blockValues: {}
    };
  },
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    rootElm.style.width = `${this.block.width}px`;
  },
  render() {
    return h('div', 'hello world');
  },
  methods: {
    onContentMouseDown(e: MouseEvent): void {
      // stop propagation to stop moving the block
      e.stopPropagation();

      // Change to editing mode if the user is eligible to edit this block.
      if (this.block.editable) {
        this.editing = true;
      }
    },
    onBlockLeftResized(e: MouseEvent): void {
      if (!this.editing) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeLeft', e, this.$refs.root);
    },
    onBlockRightResized(e: MouseEvent): void {
      if (!this.editing) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeRight', e, this.$refs.root);
    },
    saveBlock() {
      const rootElm = this.$refs.root as HTMLElement;
      const data = {
        left: pxToInt(rootElm.style.left),
        top: pxToInt(rootElm.style.top),
        width: pxToInt(rootElm.style.width)
      };
      console.log({ ...data, ...this.blockValues });
    },
    onMouseDown(e: MouseEvent) {
      e.stopPropagation();

      if (this.editing) {
        this.$emit('onMove', e, this.$refs.root);
        return;
      }

      if (this.block.editable) {
        this.editing = true;
      }
    },
    onBlockValueChanged(key: string, value: any) {
      console.log({ key, value });
      (this.blockValues as any)[key] = value;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.block {
  width: 200px;
  border: 2px dashed #fff;
  position: absolute;
  width: 200px;
  z-index: 999;

  &.editing {
    cursor: move;
    border: 2px dashed #ddd;

    .content {
      cursor: text;
    }
  }

  &.editable {
    cursor: pointer;
    &:hover {
      border: 2px dashed #ddd;
    }
  }
}

.container {
  padding: 10px;
  position: relative;
}

.save-block {
  position: absolute;
  bottom: -40px;
}

.resize {
  position: absolute;
  width: 10px;
  height: 10px;
  top: calc(50% - 5px);
  text-indent: -1000px;
  background: #ddd;
  @include border-radius(100%);
}

.resize-left {
  left: -6px;
  cursor: w-resize;
}

.resize-right {
  right: -6px;
  cursor: e-resize;
}
</style>
