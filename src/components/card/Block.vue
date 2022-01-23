<template>
  <div
    class="block"
    v-bind:class="{ editing: editing, editable: editable }"
    ref="root"
    @mousedown="onBlockMouseDown"
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
      data-testid="resize-left"
      class="resize-left resize"
      @mousedown="onBlockLeftResized"
    >
      Resize Left
    </div>
    <div
      v-if="this.editing"
      data-testid="resize-right"
      class="resize-right resize"
      @mousedown="onBlockRightResized"
    >
      Resize Right
    </div>
    <div v-if="this.editing" class="save-block" data-testid="save-block">
      <button @click="saveBlock()">Save</button>
    </div>
    <span
      v-if="this.editing"
      data-testid="delete-block"
      class="delete icon-bin"
      @click="onBlockDeleted"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BlockText from './block/text/BlockText.vue';
import BlockImage from './block/image/BlockImage.vue';
import { Block } from '@/store';
import { pxToInt } from '@/util';
import { DELETE_BLOCK, UPDATE_BLOCK } from '@/store/action_types';
import { SET_EDIT_BLOCK } from '@/store/mutation_types';

const blockMinWidth = 150;

interface draggingConfig {
  element: HTMLElement;
  X: number;
  Y: number;
}

interface resizeRightConfig {
  element: HTMLElement;
  width: number;
  X: number;
}

interface resizeLeftConfig {
  element: HTMLElement;
  width: number;
  left: number;
  X: number;
}

interface data {
  resizeRight?: resizeRightConfig;
  resizeLeft?: resizeLeftConfig;
  dragging?: draggingConfig;
  blockValues: { [key: string]: any };
}

interface Bound {
  width: number;
  height: number;
}

function resizeLeft(evt: MouseEvent, config: resizeLeftConfig): void {
  const el = config.element;

  let width = config.width - evt.clientX + config.X;
  width = Math.max(blockMinWidth, width);
  const maxWidth = el.offsetLeft + el.offsetWidth - 2; // 2 = border width
  width = Math.min(width, maxWidth);

  const diff = width - config.width;

  el.style.width = `${width - 2}px`;
  el.style.left = `${config.left - diff - 2}px`; // 2 = border width
}

function resizeRight(
  evt: MouseEvent,
  bound: Bound,
  config: resizeRightConfig
): void {
  const elm = config.element;

  let width = config.width + evt.clientX - config.X;
  width = Math.max(blockMinWidth, width);
  const maxWidth = bound.width - config.element.offsetLeft - 6;
  width = Math.min(width, maxWidth);

  elm.style.width = `${width}px`;
}

function handleDragging(
  evt: MouseEvent,
  bound: Bound,
  config: draggingConfig
): void {
  const elm = config.element;

  let left = evt.clientX + config.X;
  let top = evt.clientY + config.Y;

  left = Math.min(left, bound.width - elm.offsetWidth);
  left = Math.max(left, 0);
  top = Math.min(top, bound.height - elm.offsetHeight);
  top = Math.max(top, 0);

  elm.style.left = `${left}px`;
  elm.style.top = `${top}px`;
}

export default defineComponent({
  components: {
    blocktext: BlockText,
    blockimage: BlockImage
  },
  props: {
    readonly: {
      type: Boolean,
      required: true
    },
    editing: Boolean,
    block: {
      type: Object as PropType<Block>,
      required: true
    },
    bound: {
      type: Object as PropType<Bound>,
      required: true
    }
  },
  data(): data {
    return {
      blockValues: {}
    };
  },
  computed: {
    editable() {
      return this.canEdit();
    }
  },
  created() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  },
  unmounted() {
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    rootElm.style.width = `${this.block.width}px`;
  },
  methods: {
    handleMouseUp(e: MouseEvent) {
      e.stopPropagation();
      this.dragging = undefined;
      this.resizeLeft = undefined;
      this.resizeRight = undefined;
    },
    handleMouseMove(e: MouseEvent) {
      if (this.dragging) {
        handleDragging(e, this.bound, this.dragging);
        return;
      }

      if (this.resizeRight) {
        resizeRight(e, this.bound, this.resizeRight);
        return;
      }

      if (this.resizeLeft) {
        resizeLeft(e, this.resizeLeft);
      }
    },
    canEdit(): boolean {
      return !!this.block.editable && !this.$store.getters.hasEditingBlock();
    },
    startEdit() {
      this.$store.commit(SET_EDIT_BLOCK, { blockId: this.block.id });
    },
    onContentMouseDown(e: MouseEvent): void {
      e.stopPropagation();

      if (this.canEdit()) {
        this.startEdit();
      }
    },
    onBlockLeftResized(e: MouseEvent): void {
      e.stopPropagation();
      const elm = this.$refs.root as HTMLElement;

      this.resizeLeft = {
        element: elm,
        width: elm.offsetWidth,
        left: elm.offsetLeft,
        X: e.clientX
      };
    },
    onBlockRightResized(e: MouseEvent): void {
      e.stopPropagation();
      const elm = this.$refs.root as HTMLElement;

      this.resizeRight = {
        element: elm,
        width: elm.offsetWidth,
        X: e.clientX
      };
    },
    saveBlock() {
      const rootElm = this.$refs.root as HTMLElement;
      const input: any = {
        left: pxToInt(rootElm.style.left),
        top: pxToInt(rootElm.style.top),
        width: pxToInt(rootElm.style.width),
        ...this.blockValues
      };
      if (this.$store.state.app.activePageId) {
        input.pageId = this.$store.state.app.activePageId;
      }
      this.$store.dispatch(UPDATE_BLOCK, {
        blockId: this.block.id,
        data: input
      });
    },
    onBlockMouseDown(e: MouseEvent) {
      if (!this.block.editable) {
        return;
      }

      // eslint-disable-next-line vue/max-len
      // stop triggering the event when the page that contains this block is not active page
      // and it is not in editing mode
      if (
        !this.editing &&
        !this.$store.getters.isPageActive(this.block.pageId)
      ) {
        return;
      }

      e.stopPropagation();

      const elm = this.$refs.root as HTMLElement;
      if (this.editing) {
        this.dragging = {
          element: elm,
          X: elm.offsetLeft - e.clientX,
          Y: elm.offsetTop - e.clientY
        };

        return;
      }

      if (!this.$store.getters.hasEditingBlock()) {
        this.startEdit();
      }
    },
    onBlockValueChanged(key: string, value: any) {
      (this.blockValues as any)[key] = value;
    },
    onBlockDeleted(e: MouseEvent) {
      e.stopPropagation();
      this.$store.dispatch(DELETE_BLOCK, { blockId: this.block.id });
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.block {
  width: 200px;
  position: absolute;
  width: 200px;
  @include text-select();

  &.editing {
    cursor: move;
    border: 2px dashed rgba(8, 207, 108, 0.37);
    z-index: 999;
    @include no-text-select();
  }

  &.editable {
    cursor: pointer;
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
  text-indent: -9999px;
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
  color: red;
  background: #fff;
  border: 1px solid red;
  @include border-radius(100%);
  padding: 3px;
  top: -13px;
  left: -13px;
  position: absolute;
  cursor: pointer;
}
</style>
