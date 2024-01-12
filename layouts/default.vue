<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/game">Game</NuxtLink></li>
          <li><NuxtLink to="/pokedex">Pokedex</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
      <div class="imageContainer">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  text-decoration: none;
  padding: 0;
  margin: 0;
  list-style: none;
}

nav {
  background-color: rgba(23, 23, 23, 0.1);

  ul {
    display: flex;
    justify-content: space-evenly;
    margin-top: 0;
    background-color: rgb(13, 12, 12);

    li {
      padding: 10px 5px;

      a {
        color: rgb(47, 52, 52);
        width: 100%;
        height: 100%;
        font-size: 35px;

        &:hover {
          color: #67ea20;
        }
      }
    }
  }
}

.router-link-active {
  color: #13cc1f;
}
.imageContainer {
  display: flex;
  justify-content: space-evenly;
  background-image: url('../assets/images/forest3.jpg');
  width: 100%;
  height: 900px; /* Set the desired height */
  background-size: cover; /* Adjust as needed (cover, contain, etc.) */
  background-position: center center; /* Adjust the position if needed */
  background-repeat: no-repeat; /* Prevent image repetition */
}
</style>
