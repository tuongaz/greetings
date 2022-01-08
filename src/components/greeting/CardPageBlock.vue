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
        <div class="tool tool-font">
          <div class="tool-toggle" @click="toggleFont()">
            <svg
              class="svg-inline--fa fa-font fa-w-14"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="font"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="tool tool-color">
          <div class="tool-toggle" @click="toggleColor()">
            <svg
              class="svg-inline--fa fa-palette fa-w-16 palette_icon"
              style="color: rgb(57, 73, 171)"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="palette"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
              ></path>
            </svg>
          </div>
        </div>
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

export default defineComponent({
  components: {
    ToolTextAlign
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
