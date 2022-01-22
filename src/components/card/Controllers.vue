<template>
  <div>
    <button @click="newBlock">New Text</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    newBlock() {
      this.$emit('newBlock', 'blocktext');
    }
  }
});
</script>
