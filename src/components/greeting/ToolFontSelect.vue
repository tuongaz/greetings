<template>
  <div class="tool">
    <div class="tool-toggle" data-testid="toggle-text-align" @click="toggle">
      <svg
        class="svg-inline--fa fa-font fa-w-14"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="font"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        data-fa-i2svg=""
      >
        <path
          fill="currentColor"
          d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"
        ></path>
      </svg>
    </div>
    <div class="options" ref="options" data-testid="options">
      <ul>
        <li
          @click="onFontSelect(font)"
          v-bind:style="{ fontFamily: font }"
          v-for="(font, index) in fonts"
          :data-testid="'option-' + index"
          :key="font"
        >
          {{ font }}
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
      fonts: [
        'Courier New',
        'Times New Roman',
        'Arial',
        'Verdana',
        'Georgia',
        'Architects Daughter',
        'Gochi Hand',
        'Grand Hotel'
      ]
    };
  },
  methods: {
    toggle() {
      this.clicked = true;
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
    },
    onFontSelect(font: string) {
      this.$emit('fontSelected', font);
    },
    close() {
      const elm = this.$refs.options as HTMLElement;
      elm.style.display = 'none';
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
  background: #fff;
  display: none;
  position: absolute;
  top: 25px;
  border: 1px solid #eee;
  width: 200px;
  height: 200px;
  overflow: auto;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      border-bottom: 1px solid #eee;
      padding: 5px 10px;
      display: block;
    }
  }
}

.option {
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
