<template>
  <div class="controllers">
    <div style="margin-bottom: 20px">
      <button @click="newBlock">New Text</button>
    </div>
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

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.controllers {
  width: 450px;
  margin: 20px auto;
}
</style>
