<template>
  <Header />
  <Body>
    <div>
      <h2>A card for John Doe</h2>
      <Card />
    </div>
  </Body>
  <Footer />
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
h2 {
  text-align: center;
}
</style>

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
  }
});
</script>
