<template>
  <div v-bind:class="{ editing: editing }">
    <span
      v-html="block.text"
      class="content"
      ref="content"
      :contenteditable="editing"
      @input="onContentChange"
      @mousedown="onContentMouseDown"
    ></span>

    <div v-if="editing" class="toolbar">
      <ToolFontSelect @font-selected="onFontSelected" />
      <ToolColorSelect @color-selected="onColorSelected" />
      <ToolTextAlign @text-align-selected="onTextAlignSelected" />
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
  emits: ['editing', 'onMove', 'blockValueChanged'],
  props: {
    editing: Boolean,
    block: {
      type: Object as PropType<Block>,
      required: true
    }
  },
  mounted() {
    const contentElm = this.$refs.content as HTMLElement;
    contentElm.style.fontFamily = this.block.fontFamily;
    contentElm.style.color = this.block.fontColor || 'inherit';
    contentElm.style.textAlign = this.block.textAlign || 'inherit';
  },
  methods: {
    onContentMouseDown(e: MouseEvent): void {
      if (!this.block.editable || (this.block.editable && !this.editing)) {
        // don't do anything if the block is not editable
        // or it is not in editing mode.
        return;
      }

      // stop propagation when it is in editing mode
      e.stopPropagation();
    },
    onColorSelected(color: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.color = color;
      this.$emit('blockValueChanged', 'fontColor', color);
    },
    onFontSelected(font: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.fontFamily = font;
      this.$emit('blockValueChanged', 'fontFamily', font);
    },
    onTextAlignSelected(value: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.textAlign = value;
      this.$emit('blockValueChanged', 'textAlign', value);
    },
    onContentChange(e: any) {
      const contentElm = this.$refs.content as HTMLElement;
      this.$emit('blockValueChanged', 'text', contentElm.innerHTML);
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
.editing {
  .content {
    cursor: text;
    padding-bottom: 20px;
  }
}

.content {
  font-size: 18px;
  outline: none;
  display: inline-block;
  min-width: 100%;
}

.tool {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding: 0 10px;
  position: relative;
}

.toolbar {
  position: absolute;
  bottom: 0;
}
</style>
