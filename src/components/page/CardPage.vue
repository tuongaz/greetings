<template>
  <div>
    <Card :activePageId="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/greeting/Card.vue';

export default defineComponent({
  components: {
    Card
  }
});
</script>
