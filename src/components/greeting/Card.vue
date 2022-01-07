<template>
  <div class="card">
    <CardPage
      v-for="page in pages"
      :key="page.id"
      :page-id="page.id"
      @on-change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardPage from './CardPage.vue';

export default defineComponent({
  components: {
    CardPage
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    }
  },
  methods: {
    onChange(event: any) {
      console.log(event);
    }
  }
});
</script>
<style scoped>
.card {
  padding: 100px;
}
</style>
