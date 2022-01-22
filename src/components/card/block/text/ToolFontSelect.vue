<template>
  <div class="tool">
    <span
      class="icon-font tool-toggle"
      data-testid="toggle-font-select"
      @click="toggle"
    ></span>
    <div class="options" ref="options" data-testid="options">
      <ul>
        <li
          @click="onFontSelect(font)"
          v-bind:style="{ fontFamily: font[0] }"
          v-for="(font, index) in fonts"
          :data-testid="'option-' + index"
          :key="font[0]"
        >
          {{ font[1] }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { fonts } from '@/config';

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
      fonts
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
