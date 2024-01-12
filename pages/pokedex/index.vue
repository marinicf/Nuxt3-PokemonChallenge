<template>
  <div class="progress"></div>
  <div class="container">
    <div class="item" v-for="p in pokedex"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const pokedex = ref(new Array(151).fill('null'));
</script>
<style scoped lang="scss">
/* Style for a transparent button */
.container {
  margin-top: 1000px;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 100px;
  align-content: space-evenly;
  gap: 50px;
}
.item {
  width: 200px;
  height: 200px;
  border: 1px solid rgb(28, 203, 2);
  border-radius: 40px;
}
</style>
