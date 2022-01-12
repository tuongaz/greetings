<template>
  <div class="card">
    <Page
      v-for="page in pages"
      :key="page.id"
      :page-id="page.id"
      @on-change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from './Page.vue';

export default defineComponent({
  components: {
    Page
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
