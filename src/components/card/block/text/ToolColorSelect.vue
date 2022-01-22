<template>
  <div class="tool">
    <span
      class="icon-color_lens"
      data-testid="toggle-color-select"
      @click="toggle"
    ></span>
    <div class="options" data-testid="options" ref="options">
      <ul>
        <li
          v-for="(color, index) in colors"
          :data-testid="'option-' + index"
          :key="color"
          @click="selectColor(color)"
          v-bind:style="{ background: color }"
        >
          {{ color }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@/config';

export default defineComponent({
  mounted() {
    (this.$refs.options as HTMLElement).style.display = 'none';
    document.addEventListener('click', () => {
      console.log('A');
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
      clicked: false,
      colors
    };
  },
  methods: {
    toggle() {
      this.clicked = true;
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
    },
    selectColor(color: string) {
      this.$emit('colorSelected', color);
    },
    close() {
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = 'none';
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
.tool {
  cursor: pointer;
}
.options {
  z-index: 999;
  background: #fff;
  display: none;
  position: absolute;
  top: 25px;

  ul {
    margin: 0;
    padding: 20px;
    list-style: none;
    width: 100px;

    li {
      display: inline-block;
      margin-right: 10px;
      width: 10px;
      height: 10px;
      @include border-radius(100%);
      text-indent: -9900px;
    }
  }
}

.option {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
