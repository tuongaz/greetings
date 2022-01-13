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
    <div v-if="this.editing" class="delete" @click="onBlockDeleted">Delete</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, h } from 'vue';
import BlockText from './block/text/BlockText.vue';
import BlockImage from './block/image/BlockImage.vue';
import { Block } from '@/store';
import { pxToInt } from '@/util';

export default defineComponent({
  components: {
    blocktext: BlockText,
    blockimage: BlockImage
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
  methods: {
    onContentMouseDown(e: MouseEvent): void {
      e.stopPropagation();

      // Change to editing mode if the user is eligible to edit this block.
      if (this.block.editable) {
        this.editing = true;
      }
    },
    onBlockLeftResized(e: MouseEvent): void {
      e.stopPropagation();
      this.$emit('onResizeLeft', e, this.$refs.root);
    },
    onBlockRightResized(e: MouseEvent): void {
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

      this.editing = false;
    },
    onMouseDown(e: MouseEvent) {
      if (!this.block.editable) {
        return;
      }
      e.stopPropagation();

      if (this.editing) {
        this.$emit('onMove', e, this.$refs.root);
        return;
      }

      this.editing = true;
    },
    onBlockValueChanged(key: string, value: any) {
      (this.blockValues as any)[key] = value;
    },
    onBlockDeleted(e: MouseEvent) {
      e.stopPropagation();
      console.log('deleted');
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.block {
  width: 200px;
  border: 2px dashed rgba(255, 255, 255, 0);
  position: absolute;
  width: 200px;
  z-index: 999;

  &.editing {
    cursor: move;
    border: 2px dashed #ddd;
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

.delete {
  text-indent: -999px;
  background: red;
  @include border-radius(100%);
  width: 15px;
  height: 15px;
  position: absolute;
  top: -7px;
  left: -7px;
  cursor: pointer;
}
</style>
