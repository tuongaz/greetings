<template>
  <div class="tool">
    <div class="tool-toggle" data-testid="toggle-text-align" @click="toggle">
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

export default defineComponent({
  mounted() {
    (this.$refs.options as HTMLElement).style.display = 'none';
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
      clicked: false,
      colors: [
        '#e53935',
        '#d81b60',
        '#8e24aa',
        '#5e35b1',
        '#3949ab',
        '#1e88e5',
        '#039be5',
        '#00acc1',
        '#00897b',
        '#43a047',
        '#7cb342',
        '#c0ca33',
        '#fbc02d',
        '#ffb300',
        '#fb8c00',
        '#f4511e',
        '#6d4c41',
        '#757575',
        '#546e7a',
        '#000000'
      ]
    };
  },
  methods: {
    toggle(e: Event) {
      // e.stopPropagation();
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
@import '../../assets/scss/mixins.scss';
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
      text-indent: -1000px;
    }
  }
}

.option {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
