/** - passing block position - passign list of blocks - choose font, color, font size - vuex */

<template>
  <div class="page" ref="root">
    <CardPageBlock
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      @on-resize-left="onResizeLeft"
      @on-resize-right="onResizeRight"
      @on-move="onMove"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardPageBlock from './CardPageBlock.vue';
import { Block } from '@/store';

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
}

function resizeLeft(evt: MouseEvent, page: HTMLElement, config: resizeLeftConfig): void {
  const el = config.element;

  let width = config.width - evt.clientX + config.X;
  width = Math.max(blockMinWidth, width);
  const maxWidth = el.offsetLeft + el.offsetWidth - 2; // 2 = border width
  width = Math.min(width, maxWidth);

  const diff = width - config.width;

  el.style.width = `${width - 2}px`;
  el.style.left = `${config.left - diff - 2}px`; // 2 = border width
}

function resizeRight(evt: MouseEvent, page: HTMLElement, config: resizeRightConfig): void {
  const elm = config.element;

  let width = config.width + evt.clientX - config.X;
  width = Math.max(blockMinWidth, width);
  const maxWidth = page.offsetWidth - config.element.offsetLeft - 6;
  width = Math.min(width, maxWidth);

  elm.style.width = `${width}px`;
}

function handleDragging(evt: MouseEvent, page: HTMLElement, config: draggingConfig): void {
  const elm = config.element;

  let left = evt.clientX + config.X;
  let top = evt.clientY + config.Y;

  left = Math.min(left, page.offsetWidth - elm.offsetWidth);
  left = Math.max(left, 0);
  top = Math.min(top, page.offsetHeight - elm.offsetHeight);
  top = Math.max(top, 0);

  elm.style.left = `${left}px`;
  elm.style.top = `${top}px`;
}

export default defineComponent({
  props: {
    pageId: String,
  },
  components: {
    CardPageBlock,
  },
  data(): data {
    return {};
  },
  computed: {
    blocks(): Block[] {
      return this.$store.getters.getBlocksByPageID(this.pageId);
    },
  },
  mounted() {
    document.addEventListener('mouseup', () => {
      this.dragging = undefined;
      this.resizeLeft = undefined;
      this.resizeRight = undefined;
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      const page: HTMLElement = this.$refs.root as HTMLElement;

      if (this.dragging) {
        handleDragging(e, page, this.dragging);
        return;
      }

      if (this.resizeRight) {
        resizeRight(e, page, this.resizeRight);
        return;
      }

      if (this.resizeLeft) {
        resizeLeft(e, page, this.resizeLeft);
      }
    });
  },
  methods: {
    onResizeLeft(e: MouseEvent, elm: HTMLElement) {
      this.resizeLeft = {
        element: elm,
        width: elm.offsetWidth,
        left: elm.offsetLeft,
        X: e.clientX,
      };
    },
    onResizeRight(e: MouseEvent, elm: HTMLElement) {
      this.resizeRight = {
        element: elm,
        width: elm.offsetWidth,
        X: e.clientX,
      };
    },
    onMove(e: MouseEvent, elm: HTMLElement) {
      this.dragging = {
        element: elm,
        X: elm.offsetLeft - e.clientX,
        Y: elm.offsetTop - e.clientY,
      };
    },
  },
});
</script>

<style scoped>
.page {
  position: relative;
  overflow: hidden;
  border: 1px solid #cccccc;
  width: 500px;
  height: 500px;
}
</style>
