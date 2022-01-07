<template>
  <div class="root">
    <Page />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Page from '../components/Page.vue';

@Options({
  components: {
    Page,
  },
  data() {
    return {
      count: 1,
      draggable: true,
    };
  },
})
export default class Home extends Vue {}
</script>
