<script setup>
import { RouterLink, RouterView } from 'vue-router'
import bottomTab from './views/bottomTab/index.vue';
</script>

<template>
  <div id="container" class="container">
    <main>
      <RouterView />
    </main>
    <footer>
      <bottomTab></bottomTab>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);

  main {
    height: calc(100vh - 50px);
    overflow: hidden;
  }

  footer {
    height: 50px;
  }
}
</style>
