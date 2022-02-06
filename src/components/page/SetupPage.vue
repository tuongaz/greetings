<template>
  <Header />
  <Body>
    <form @submit.prevent="submit()">
      <BaseInput label="Name" v-model="card.name" />
      <button>Submit</button>
    </form>
  </Body>
  <Footer />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/page/Header.vue';
import Footer from '@/components/page/Footer.vue';
import Body from '@/components/page/Body.vue';
import BaseInput from '@/components/form/BaseInput.vue';

export default defineComponent({
  components: { Body, Header, Footer, BaseInput },
  data() {
    return {
      card: {
        name: 'hello world'
      }
    };
  },
  methods: {
    submit() {
      console.log(this.card);
    }
  }
});
</script>
