<template>
  <Header />
  <Body>
    <Card :cardId="cardId" :pageNumber="page" />
  </Body>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/card/Card.vue';
import Header from '@/components/page/Header.vue';
import Footer from '@/components/page/Footer.vue';
import Body from '@/components/page/Body.vue';

export default defineComponent({
  components: {
    Card,
    Header,
    Footer,
    Body
  },
  computed: {
    page() {
      const parsed = parseInt(this.pageNumber, 10);
      if (!parsed) {
        return 1;
      }

      return parsed;
    }
  },
  props: {
    cardId: {
      required: true,
      type: String
    },
    pageNumber: {
      type: String,
      required: true
    }
  }
});
</script>
