<template>
  <div class="slider">
    <div class="progress">Page {{ activePageNumber }}/{{ totalPages }}</div>
    <Slider
      :tooltips="false"
      :modelValue="activePageNumber"
      :min="minPage"
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
    activePageNumber() {
      return this.$store.getters.activePageNumber();
    },
    totalPages() {
      return this.$store.getters.totalPages();
    },
    minPage() {
      if (
        this.$store.getters.activePageNumber() === 2 &&
        this.$store.getters.hasEditingBlock()
      ) {
        return 2;
      }

      return 1;
    },
    maxPage() {
      let count = this.$store.getters.totalPages();
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
