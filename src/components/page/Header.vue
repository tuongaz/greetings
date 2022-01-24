<template>
  <nav>
    <div class="container">
      <h1><span>Card</span>.Group</h1>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

nav {
  border-bottom: 1px solid #eee;

  .container {
    width: 992px;
    margin: auto;
    padding: 20px 0;
  }
}

h1 {
  color: rgb(0, 109, 212);
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  margin: 10px 20px;

  span {
    color: rgb(223, 163, 0);
  }
}
</style>
