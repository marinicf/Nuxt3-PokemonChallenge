<template>
  <div class="con">
    <NuxtLink class="transparent-button" to="/game">Start Game</NuxtLink>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const pokedex = ref(new Array(151).fill('null'));
</script>
<style scoped lang="scss">
.con {
  display: flex;
  justify-content: center;

  background-image: url('../assets/images/pikachu.jpg');
  width: 100%;
  height: 900px; /* Set the desired height */
  background-size: cover; /* Adjust as needed (cover, contain, etc.) */
  background-position: center center; /* Adjust the position if needed */
  background-repeat: no-repeat; /* Prevent image repetition */
}

/* Style for a transparent button */
.transparent-button {
  background-color: rgba(
    0,
    0,
    0,
    0
  ); /* Black with 0% opacity (fully transparent) */
  border: 0; /* No border */
  padding: 10px 20px;
  color: #333; /* Default text color */
  cursor: pointer;
  margin-top: 200px;
  font-size: 50px;

  &:hover {
    color: #13cc1f(116, 255, 3); /* Text color on hover */
  }

  /* Adding a smooth transition for a nice visual effect on color change */
  transition: color 0.3s ease-in-out;
}
</style>
