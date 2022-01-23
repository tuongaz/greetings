<template>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Gochi+Hand&family=Grand+Hotel&family=Indie+Flower&display=swap');
@import url('assets/icons/icons.css');
@import '@/assets/scss/mixins.scss';

#app {
  position: relative;
  width: 100%;
  height: 100%;
}

html {
  font-family: sans-serif;
}

img {
  width: 100%;
  @include no-text-select();
  @include no-user-drag();
}

body {
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
