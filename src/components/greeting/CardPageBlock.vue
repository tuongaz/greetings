<template>
  <div
    class="block"
    v-bind:class="{ editable: block.editable }"
    ref="root"
    @mousedown="onBlockMoved"
  >
    <div class="container">
      <span
        class="content"
        ref="content"
        :contenteditable="block.editable"
        @mousedown="contentMouseDown"
      />

      <div v-if="block.editable" class="toolbar">
        <ToolFontSelect @font-selected="onFontSelected" />
        <ToolColorSelect @color-selected="onColorSelected" />
        <ToolTextAlign @text-align-selected="onTextAlignSelected" />
      </div>
    </div>
    <div
      v-if="block.editable"
      class="resize-left resize"
      @mousedown="onBlockLeftResized"
    >
      Resize Left
    </div>
    <div
      v-if="block.editable"
      class="resize-right resize"
      @mousedown="onBlockRightResized"
    >
      Resize Right
    </div>
    <div v-if="block.editable" class="save-block">
      <button @click="saveBlock()">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Block } from '@/store';
import ToolTextAlign from './ToolTextAlign.vue';
import ToolColorSelect from './ToolColorSelect.vue';
import ToolFontSelect from './ToolFontSelect.vue';

export default defineComponent({
  components: {
    ToolTextAlign,
    ToolColorSelect,
    ToolFontSelect
  },
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true
    }
  },
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    const contentElm = this.$refs.content as HTMLElement;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    contentElm.innerText = this.block.text;
    contentElm.style.fontFamily = this.block.fontFamily;
    contentElm.style.color = this.block.fontColor || 'inherit';
    contentElm.style.fontStyle = this.block.fontStyle || 'inherit';
    contentElm.style.textAlign = this.block.textAlign || 'inherit';
  },
  methods: {
    contentMouseDown(e: MouseEvent): void {
      // stop propagation to stop moving the block
      e.stopPropagation();
    },
    onBlockLeftResized(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeLeft', e, this.$refs.root);
    },
    onBlockRightResized(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeRight', e, this.$refs.root);
    },
    saveBlock() {
      console.log('save block');
    },
    onBlockMoved(e: MouseEvent) {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onMove', e, this.$refs.root);
    },
    onColorSelected(color: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.color = color;
    },
    onFontSelected(font: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.fontFamily = font;
    },
    onTextAlignSelected(value: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.textAlign = value;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

.editable {
  cursor: move;
  border: 2px dashed #ddd;
}

.block {
  width: 200px;
  position: absolute;
  width: 200px;
  z-index: 999;
}

.content {
  cursor: text;
  font-size: 18px;
  outline: none;
  display: inline-block;
  min-width: 100%;
  padding-bottom: 20px;
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

.tool {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 15px;
  position: relative;
}

.resize-left {
  left: -6px;
  cursor: w-resize;
}

.resize-right {
  right: -6px;
  cursor: e-resize;
}

.toolbar {
  position: absolute;
  bottom: 0;
}
</style>
