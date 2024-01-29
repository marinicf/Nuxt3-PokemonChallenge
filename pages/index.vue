<template>
  <div class="con">
    <NuxtLink class="transparent-button" to="/game">Start Game</NuxtLink>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.con {
  display: flex;
  justify-content: center;

  background-image: url('../assets/images/greedPikachu.jpg');
  width: 60rem;
  height: 900px; /* Set the desired height */
  background-size: cover; /* Adjust as needed (cover, contain, etc.) */
  background-position: center center; /* Adjust the position if needed */
  background-repeat: no-repeat; /* Prevent image repetition */
}

/* Style for a transparent button */
.transparent-button {
  color: rgb(140, 135, 135);
  padding: 10px 20px;
  margin: 200px 0px 500px 0px;
  font-size: 50px;
  text-decoration: none;

  &:hover {
    color: #cc7313(116, 255, 3); /* Text color on hover */
  }
}
</style>
