<template>
  <div class="slider">
    <div class="progress">Page {{ currentPageIndex }}/{{ totalPages }}</div>
    <Slider
      :tooltips="false"
      :modelValue="sliderValue"
      :min="1"
      :max="maxPage"
      :lazy="false"
      @update="onSliderChange"
    />
  </div>
</template>

<script lang="ts">
import Slider from '@vueform/slider';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Slider
  },
  props: {
    activePageId: Number
  },
  computed: {
    currentPageIndex() {
      return this.$store.getters.getActivePageIndex() + 1;
    },
    totalPages() {
      return this.$store.getters.getPages().length;
    },
    sliderValue() {
      return this.$store.getters.getActivePageIndex() + 1;
    },
    maxPage() {
      let count = this.$store.getters.getPages().length;
      if (this.$store.getters.hasEditingBlock()) {
        count -= 1;
      }

      return Math.max(count, 0);
    }
  },
  methods: {
    onSliderChange(index: number) {
      this.$emit('changed', index - 1);
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.progress {
  text-align: center;
  margin: 10px 0;
}

.slider {
  width: 450px;
  margin: 20px auto;
}
</style>
