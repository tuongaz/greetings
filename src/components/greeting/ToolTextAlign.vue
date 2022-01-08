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
      <div @click="selectLeft" class="option">
        <svg
          class="svg-inline--fa fa-align-left fa-w-14"
          aria-hidden="true"
          focusable="false"
          data-prefix="fa"
          data-icon="align-left"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
          ></path>
        </svg>
      </div>
      <div @click="selectCenter" class="option">
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
      <div @click="selectRight" class="option">
        <svg
          class="svg-inline--fa fa-align-right fa-w-14"
          aria-hidden="true"
          focusable="false"
          data-prefix="fa"
          data-icon="align-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          data-fa-i2svg=""
        >
          <path
            fill="currentColor"
            d="M16 224h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm416 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-384H172.83A12.82 12.82 0 0 0 160 44.83v38.34A12.82 12.82 0 0 0 172.83 96h262.34A12.82 12.82 0 0 0 448 83.17V44.83A12.82 12.82 0 0 0 435.17 32zm0 256H172.83A12.82 12.82 0 0 0 160 300.83v38.34A12.82 12.82 0 0 0 172.83 352h262.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
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
    toggle(e: Event) {
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
  z-index: 999;
  background: #fff;
  display: none;
  position: absolute;
  top: 25px;
  border: 1px solid #eee;
  width: 100px;
}

.option {
  width: 14px;
  display: inline-block;
  margin-right: 15px;
}
</style>
