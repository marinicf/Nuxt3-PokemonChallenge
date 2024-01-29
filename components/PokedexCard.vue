<template>
  <NuxtLink :to="'pokedex/' + pokemon.id">
    <p class="pokeId">{{ '#' + pokemon.id }}</p>
    <img :src="pokemon.sprites.front_default" alt="pokemon" class="pokeImg" />
    <p class="pokeName">{{ capitalizeFirstLetter(pokemon.name) }}</p>
  </NuxtLink>
</template>
<script setup>
const { pokemon } = defineProps(['pokemon']);

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
</script>
<style scoped lang="scss">
.pokeName {
  margin: 0px;
  padding: 0px;
}
.pokeId {
  color: black;
  margin: 0px;
  padding: 0px;
}
.pokeImg {
  width: 126px;
  height: 126px;
}
@media (min-width: 475px) {
  .container {
    max-width: 475px;
  }
  .pokeImg {
    width: 150px;
    height: 150px;
  }
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
  .pokeImg {
    width: 130px;
    height: 130px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
  .pokeImg {
    width: 150px;
    height: 140px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
  .pokeImg {
    width: 150px;
    height: 120px;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
  .pokeImg {
    width: 170px;
    height: 150px;
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
