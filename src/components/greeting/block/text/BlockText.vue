<template>
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
        this.$emit('editing');
      }
    },
    onMouseDown(e: MouseEvent) {
      e.stopPropagation();

      if (this.editing) {
        this.$emit('onMove', e, this.$refs.root);
        return;
      }

      if (this.block.editable) {
        this.$emit('editing');
      }
    },
    onColorSelected(color: string) {
      const contentElm = this.$refs.content as HTMLElement;
      contentElm.style.color = color;
      this.$emit('blockValueChanged', 'color', color);
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
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.content {
  font-size: 18px;
  outline: none;
  display: inline-block;
  min-width: 100%;
  padding-bottom: 20px;
}

.tool {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 15px;
  position: relative;
}

.toolbar {
  position: absolute;
  bottom: 0;
}
</style>
