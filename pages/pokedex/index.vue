<template>
  <div class="progressBar">
    <div class="progress"></div>
  </div>

  <div class="container">
    <div v-for="p in pokemons">
      <NuxtLink class="item" :to="'pokedex/' + p.id">
        <p class="pokeId">{{ p.id ? '#' + p.id : '' }}</p>
        <img :src="p.id ? p.sprites.front_default : ''" alt="pokemon" />
        <p class="pokeName">{{ p.name ? p.name : '' }}</p>
      </NuxtLink>
    </div>
    <!-- <div class="item" v-for="p in pokemons">
      <p class="pokeId">{{ p.id ? '#' + p.id : '' }}</p>
      <img :src="p.id ? p.sprites.front_default : ''" alt="pokemon" />
      <p class="pokeName">{{ p.name ? p.name : '' }}</p>
      <Card
        v-for="p in pokemons"
        :id="p.id"
        :sprite="p.sprites.front_default"
        :name="p.name"
      ></Card>
    </div> -->
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const progress = ref(0);

const pokemonStore = usePokemonStore();
let { pokemons } = storeToRefs(pokemonStore);
</script>
<style scoped lang="scss">
/* Style for a transparent button */
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 40px 100px;
  align-content: flex-start;
  gap: 50px;
}
.item {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-decoration: none;
  color: black;

  width: 200px;
  height: 200px;
  border: 2px solid rgb(28, 203, 2);
  border-radius: 40px;
  &:hover {
    border-color: #1c40d0;
  }
  .pokeId {
    color: black;
  }
}
.progressBar {
  width: 100%;
}
.progress {
  background-color: green;
}
</style>
