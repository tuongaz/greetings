<template>
  <button @click="newBlock">New Text</button>
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

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
button {
  border: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
  background: rgb(0, 143, 209);
  color: #fff;
}
</style>
