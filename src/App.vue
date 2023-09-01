<script setup>
import { RouterLink, RouterView } from 'vue-router'
import bottomTab from './views/bottomTab/index.vue';
</script>

<template>
  <main >
    <RouterView />
  </main>
  <footer>
    <bottomTab></bottomTab>
  </footer>
</template>

<style scoped>
main {
  height: calc(100vh - 50px);
}
footer {
  height: 50px;
}
</style>
