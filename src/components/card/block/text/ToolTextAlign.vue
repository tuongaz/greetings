<template>
  <div class="tool">
    <span
      data-testid="toggle-text-align"
      @click="toggle"
      class="icon-paragraph-center tool-toggle"
    ></span>
    <div class="options" ref="options" data-testid="options">
      <span
        class="option icon-paragraph-left"
        @click="selectLeft"
        data-testid="select-left"
      ></span>
      <span
        @click="selectCenter"
        data-testid="select-center"
        class="icon-paragraph-center option"
      ></span>
      <span
        @click="selectRight"
        data-testid="select-right"
        class="icon-paragraph-right option"
      ></span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    (this.$refs.options as HTMLElement).style.display = 'none';

    // close the options when we click outside of the option.
    document.addEventListener('click', () => {
      if (!this.clicked) {
        const elm = this.$refs.options as HTMLElement;
        if (!elm) {
          return;
        }
        elm.style.display = 'none';
      }
      this.clicked = false;
    });
  },
  data() {
    return {
      clicked: false
    };
  },
  methods: {
    toggle() {
      // e.stopPropagation();
      this.clicked = true;
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
    },
    close() {
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = 'none';
    },
    selectLeft(e: Event) {
      e.stopPropagation();
      this.$emit('textAlignSelected', 'left');
      this.close();
    },
    selectRight(e: Event) {
      e.stopPropagation();
      this.$emit('textAlignSelected', 'right');
      this.close();
    },
    selectCenter(e: Event) {
      e.stopPropagation();
      this.$emit('textAlignSelected', 'center');
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
  z-index: 999;
  display: none;
  position: absolute;
  top: 25px;
  width: 100px;
}

.option {
  width: 14px;
  display: inline-block;
  margin-right: 15px;
}
</style>
