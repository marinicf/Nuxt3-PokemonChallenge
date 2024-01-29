<template>
  <header>
    <nav class="navbar">
      <ul>
        <li>
          <NuxtLink to="/game">
            <img
              src="/assets/images/textGame.png"
              alt="pokedex"
              class="nav-item nav-game"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/pokedex">
            <img
              src="/assets/images/textPokedex.png"
              alt="pokedex"
              class="nav-item nav-pokedex"
            />
          </NuxtLink>
        </li>
        <!-- <li>
            <NuxtLink></NuxtLink>
          </li> -->
      </ul>
    </nav>
  </header>

  <div class="container">
    <div class="item item-1">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
let isNavActive = ref(false);
const toggleNav = () => {
  isNavActive.value = !isNavActive.value;
};
</script>
<style scoped lang="scss">
* {
  text-decoration: none;
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  display: grid;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 0;
  height: 100%;
  margin-top: 58px; /* Add a top margin to avoid content overlay */
}
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0px 10px; /* Adjust padding as needed */
  padding-bottom: 5px;
  z-index: 1000; /* Ensure the navbar is above other content */
}
.item {
  width: 100%;

  height: 200px;
}
.nav-game {
  width: 100%;
  height: 50px;
  border: white;
}
.nav-pokedex {
  width: 100%;
  height: 50px;
  border: white;
}
.router-link-active {
  color: #000000;
}

nav {
  background-color: rgba(232, 201, 201, 0.1);
  ul {
    display: flex;
    overflow: auto;
    justify-content: space-around;
    background-color: rgb(244, 244, 244);

    li {
      padding: 10px 10px 0 10px;
      cursor: pointer;

      a {
        color: rgb(140, 135, 135);
        width: 100%;
        height: 100%;
        font-size: 35px;

        &:hover {
          color: #827f7f;
        }
      }
    }
  }
}
.pokeball-nav {
  display: block;
  height: 70px;
  width: 100%;
  background: url('~/assets/images/pokeball50.png') no-repeat 98% center;
  cursor: pointer;
}

@media (min-width: 475px) {
  .container {
    max-width: 475px;
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(2, auto);
    // background-color: red;
    .item-1 {
      grid-area: 1 / 1 /2 /2;
      width: 100%;
    }
    .button-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .flex-item-btn {
        width: 70px;
        height: 70px;
        text-decoration: none;
        margin: 0 1rem;
        transition: 0.2s all;
        &:hover {
          transform: scale(0.96);
        }
      }
    }
  }
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    // background-color: blue;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    // background-color: rgb(12, 201, 12);
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    // background-color: rgb(9, 198, 231);
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
    // background-color: rgb(218, 214, 17);
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
    // background-color: rgb(99, 0, 219);
  }
}
</style>
