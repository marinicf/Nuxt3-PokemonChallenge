<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/game">Game</NuxtLink></li>
          <li><NuxtLink>Pokedex</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
      <slot></slot>
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

      &:hover {
        color: #f90202;
      }

      a {
        color: rgb(47, 52, 52);
        width: 100%;
        height: 100%;
        font-size: 35px;
      }
    }
  }
}

.router-link-active {
  color: #e00909;
}
</style>
