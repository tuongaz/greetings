<template>
  <div
    class="block"
    v-bind:class="{ editable: block.editable }"
    ref="root"
    @mousedown="onMove"
  >
    <div class="container">
      <span
        class="content"
        ref="content"
        :contenteditable="block.editable"
        @mousedown="contentMouseDown"
      />

      <div v-if="block.editable" class="toolbar">
        <ToolFontSelect @on-font-select="onFontSelect" />
        <ToolColorSelect @on-select-color="onSelectColor" />
        <ToolTextAlign @on-select="onSelectTextAlign" />
      </div>
    </div>
    <div
      v-if="block.editable"
      class="resize-left resize"
      @mousedown="onResizeLeft"
    >
      Resize Left
    </div>
    <div
      v-if="block.editable"
      class="resize-right resize"
      @mousedown="onResizeRight"
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
    onResizeLeft(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeLeft', e, this.$refs.root);
    },
    onSelectTextAlign(value: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.textAlign = value;
    },
    onResizeRight(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeRight', e, this.$refs.root);
    },
    toggleTextAlign(e: Event) {
      e.stopPropagation();
      console.log('select text align');
      const elm = this.$refs.textalign as HTMLElement;
      console.log(elm.style.display);
      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
    },
    toggleFont() {
      console.log('select text align');
    },
    toggleColor() {
      console.log('select text align');
    },
    saveBlock() {
      console.log('save block');
    },
    onMove(e: MouseEvent) {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onMove', e, this.$refs.root);
    },
    onSelectColor(color: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.color = color;
    },
    onFontSelect(font: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.fontFamily = font;
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
  background: #fff;
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
