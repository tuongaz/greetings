<template>
  <div class="tool">
    <div class="tool-toggle" @click="toggle">
      <svg
        class="svg-inline--fa fa-align-center fa-w-14"
        aria-hidden="true"
        focusable="false"
        data-prefix="fa"
        data-icon="align-center"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        data-fa-i2svg=""
      >
        <path
          fill="currentColor"
          d="M432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM108.1 96h231.81A12.09 12.09 0 0 0 352 83.9V44.09A12.09 12.09 0 0 0 339.91 32H108.1A12.09 12.09 0 0 0 96 44.09V83.9A12.1 12.1 0 0 0 108.1 96zm231.81 256A12.09 12.09 0 0 0 352 339.9v-39.81A12.09 12.09 0 0 0 339.91 288H108.1A12.09 12.09 0 0 0 96 300.09v39.81a12.1 12.1 0 0 0 12.1 12.1z"
        ></path>
      </svg>
    </div>
    <div class="options" ref="options">
      <div @click="selectLeft" class="option">Left</div>
      <div @click="selectCenter" class="option">Center</div>
      <div @click="selectRight" class="option">Right</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    document.addEventListener('click', () => {
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = 'none';
    });
  },
  methods: {
    toggle(e: Event) {
      e.stopPropagation();
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
    },
    close() {
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = 'none';
    },
    selectLeft(e: Event) {
      e.stopPropagation();
      this.$emit('onSelect', 'left');
      this.close();
    },
    selectRight(e: Event) {
      e.stopPropagation();
      this.$emit('onSelect', 'right');
      this.close();
    },
    selectCenter(e: Event) {
      e.stopPropagation();
      this.$emit('onSelect', 'center');
      this.close();
    }
  }
});
</script>

<style lang="scss" scoped>
.tool {
  cursor: pointer;
}
.options {
  display: none;
  position: absolute;
  top: 25px;
  border: 1px solid #eee;
}

.option {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
