<template>
  <div
    class="block"
    v-bind:class="{ editing: editing, editable: block.editable && !editing }"
    ref="root"
    @mousedown="onMouseDown"
  >
    <div class="container">
      <span
        class="content"
        ref="content"
        :contenteditable="this.editing"
        @mousedown="onContentMouseDown"
      />

      <div v-if="this.editing" class="toolbar">
        <ToolFontSelect @font-selected="onFontSelected" />
        <ToolColorSelect @color-selected="onColorSelected" />
        <ToolTextAlign @text-align-selected="onTextAlignSelected" />
      </div>
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
import { defineComponent, PropType } from 'vue';
import { Block } from '@/store';
import ToolTextAlign from './ToolTextAlign.vue';
import ToolColorSelect from './ToolColorSelect.vue';
import ToolFontSelect from './ToolFontSelect.vue';

function rgb2hex(rgb: string) {
  const values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x: string) {
    return `0${parseInt(x, 10).toString(16)}`.slice(-2);
  }

  if (values === null) {
    return '';
  }

  return `#${hex(values[1])}${hex(values[2])}${hex(values[3])}`;
}

function pxToInt(px: string): number {
  return parseInt(px.replace('px', ''), 10);
}

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
  data() {
    return {
      editing: false
    };
  },
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    const contentElm = this.$refs.content as HTMLElement;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    rootElm.style.width = `${this.block.width}px`;

    contentElm.innerText = this.block.text;
    contentElm.style.fontFamily = this.block.fontFamily;
    contentElm.style.color = this.block.fontColor || 'inherit';
    contentElm.style.textAlign = this.block.textAlign || 'inherit';
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
      const contentElm = this.$refs.content as HTMLElement;
      const data = {
        left: pxToInt(rootElm.style.left),
        top: pxToInt(rootElm.style.top),
        width: pxToInt(rootElm.style.width),
        text: contentElm.innerText,
        fontFamily: contentElm.style.fontFamily,
        color: rgb2hex(contentElm.style.color),
        textAlign: contentElm.style.textAlign
      };
      console.log(data);
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

.content {
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
