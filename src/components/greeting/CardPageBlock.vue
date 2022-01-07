<template>
  <div
    class="block"
    v-bind:class="{ moveable: block.editable }"
    ref="root"
    @mousedown="onMove"
    @input="onChange"
  >
    <div class="container" ref="container">
      <span
        class="content"
        ref="content"
        :contenteditable="block.editable"
        @mousedown="contentMouseDown"
      />
    </div>
    <div v-if="block.editable" class="resize-left resize" @mousedown="onResizeLeft">
      Resize Left
    </div>
    <div v-if="block.editable" class="resize-right resize" @mousedown="onResizeRight">
      Resize Right
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BLOCK_TEXT_CHANGE } from '@/store/action_types';
import { Block } from '@/store';

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true,
    },
  },
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    const containerElm = this.$refs.container as HTMLElement;
    const contentElm = this.$refs.content as HTMLElement;
    contentElm.innerText = this.block.text;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    containerElm.style.fontFamily = this.block.fontFamily;
    containerElm.style.fontSize = `${this.block.fontSize}px`;
    containerElm.style.color = this.block.fontColor || 'inherit';
    containerElm.style.fontStyle = this.block.fontStyle || 'inherit';
  },
  methods: {
    onChange(event: any) {
      if (!this.block.editable) {
        return;
      }

      const txt = event.target.innerText;
      this.$store.dispatch(BLOCK_TEXT_CHANGE, { blockId: this.block.id, text: txt });
    },
    contentMouseDown(e: MouseEvent): void {
      e.stopPropagation();
    },
    onResizeLeft(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeLeft', e, this.$refs.root);
    },
    onResizeRight(e: MouseEvent): void {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onResizeRight', e, this.$refs.root);
    },
    onMove(e: MouseEvent) {
      if (!this.block.editable) {
        return;
      }

      e.stopPropagation();
      this.$emit('onMove', e, this.$refs.root);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

.moveable {
  cursor: move;
  border: 2px dashed #ccc;
}

.block {
  width: 200px;
  min-height: 100px;
  position: absolute;
  width: 200px;
  background: #fff;
}

.content {
  cursor: text;
  outline: none;
  display: inline-block;
  min-width: 100%;
}

.container {
  padding: 10px;
}

.resize {
  position: absolute;
  width: 14px;
  height: 14px;
  top: calc(50% - 7px);
  text-indent: -1000px;
  background: #aaeeaa;
  @include border-radius(100%);
}

.resize-left {
  left: -7px;
  cursor: w-resize;
}

.resize-right {
  right: -7px;
  cursor: e-resize;
}
</style>
