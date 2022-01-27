<template>
  <div class="navigation">
    <div class="progress">Page {{ activePageNumber }}/{{ totalPages }}</div>

    <div class="container">
      <button :disabled="disablePrevious" class="previous" @click="previous()">
        Prev
      </button>
      <div class="slider">
        <Slider
          :tooltips="false"
          :modelValue="activePageNumber"
          :min="minPage"
          :max="maxPage"
          :lazy="false"
          @update="onSliderChange"
        />
      </div>
      <button :disabled="disableNext" class="next" @click="next()">Next</button>
    </div>
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
    minItemsToShow: Number
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
    },
    disablePrevious() {
      const activePageNumber = this.$store.getters.activePageNumber();
      return (
        activePageNumber === 1 ||
        (activePageNumber === 2 && this.$store.getters.hasEditingBlock())
      );
    },
    disableNext() {
      const activePageNumber = this.$store.getters.activePageNumber();
      const totalPages = this.$store.getters.totalPages();

      return (
        activePageNumber === totalPages ||
        (activePageNumber === totalPages - 1 &&
          this.$store.getters.hasEditingBlock())
      );
    }
  },
  methods: {
    onSliderChange(pageNumber: number) {
      this.$router.push({
        name: 'card',
        params: { pageNumber }
      });
    },
    previous() {
      const pageNum = this.$store.getters.activePageNumber() as number;
      this.$router.push({
        name: 'card',
        params: { pageNumber: pageNum - 1 }
      });
    },
    next() {
      const pageNum = this.$store.getters.activePageNumber() as number;
      this.$router.push({
        name: 'card',
        params: { pageNumber: pageNum + 1 }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.progress {
  text-align: center;
  margin: 10px 0;
  width: 100%;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.navigation {
  width: 450px;
  margin: 20px auto;
}

.slider,
.previous,
.next {
  display: inline-block;
}

.slider {
  flex: 1;
  padding: 0 20px;
}
</style>
