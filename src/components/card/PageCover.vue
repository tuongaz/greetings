<template>
  <div class="page cover left-active next-active" @click="selectPage">
    <img src="/img/HBD-awesome-co-workers-PR-2021.gif" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Page } from '@/store';

export default defineComponent({
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true
    }
  },
  computed: {
    bound() {
      return {
        width: 450,
        height: 550
      };
    }
  },
  methods: {
    selectPage(e: MouseEvent) {
      e.stopPropagation();
      if (!this.canSelect()) {
        return;
      }

      this.$emit('pageSelected', this.page.id);
    },
    canSelect() {
      return !this.$store.getters.hasEditingBlock();
    }
  }
});
</script>
