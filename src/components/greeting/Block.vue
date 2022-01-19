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
    <div
      v-if="this.editing"
      data-testid="delete-block"
      class="delete"
      @click="onBlockDeleted"
    >
      Delete
    </div>
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
  mounted() {
    const rootElm = this.$refs.root as HTMLElement;
    rootElm.style.left = `${this.block.left}px`;
    rootElm.style.top = `${this.block.top}px`;
    rootElm.style.width = `${this.block.width}px`;

    document.addEventListener('mouseup', () => {
      this.dragging = undefined;
      this.resizeLeft = undefined;
      this.resizeRight = undefined;
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
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
    });
  },
  methods: {
    canEdit(): boolean {
      return !!this.block.editable && !this.$store.getters.hasActiveBlockId();
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
      const input = {
        left: pxToInt(rootElm.style.left),
        top: pxToInt(rootElm.style.top),
        width: pxToInt(rootElm.style.width),
        ...this.blockValues,
        pageId: this.$store.state.app.activePageId
      };
      console.log({ input });
      this.$store.dispatch(UPDATE_BLOCK, {
        blockId: this.block.id,
        data: input
      });
    },
    onBlockMouseDown(e: MouseEvent) {
      const elm = this.$refs.root as HTMLElement;

      if (!this.block.editable) {
        return;
      }
      e.stopPropagation();

      if (this.editing) {
        this.dragging = {
          element: elm,
          X: elm.offsetLeft - e.clientX,
          Y: elm.offsetTop - e.clientY
        };

        return;
      }

      if (!this.$store.getters.hasActiveBlockId()) {
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
  border: 2px dashed rgba(255, 255, 255, 0);
  position: absolute;
  width: 200px;
  @include text-select();

  &.editing {
    cursor: move;
    border: 2px dashed #ddd;
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
