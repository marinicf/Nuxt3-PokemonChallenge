<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progressPercentage}%` }">
      <p class="progress-num">
        {{ `${Math.round(progressPercentage * 100) / 100}%` }}
      </p>
    </div>
  </div>

  <div class="grid-container">
    <div v-for="p in allPokemons" :key="p.id" class="card-container">
      <PokedexCard v-if="p.abilities" class="item" :pokemon="p"></PokedexCard>
      <NuxtLink v-else class="item" :to="'pokedex/' + p.id">
        <img src="~assets/images/mark.png" alt="pokemon" class="mark" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const progress = ref(0);
const pokemonStore = usePokemonStore();
const { allPokemons, progressPercentage } = pokemonStore;

onMounted(() => {
  if (process.client && window) {
    window.history.scrollRestoration = 'auto';
  }
});
</script>
<style scoped lang="scss">
.grid-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  padding: 1rem;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  text-decoration: none;
  color: black;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  transition: all 100ms;
  padding: 10px;
  &:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35rem 1.175rem,
      rgba(2, 8, 20, 0.8) 0px 0.175rem 0.5rem;
    transform: translateY(-3px) scale(1.1);
  }
}
.mark {
  width: 100%;
  height: 100%;
}
.progress-bar {
  border: 1px solid;
  border-radius: 10px;
  width: 100%;
  margin: 1rem 0 0 0;
  .progress {
    border: 1px solid black;
    border-radius: 10px;
    height: 3rem;
    background-color: rgb(28, 237, 94);
    .progress-num {
      text-align: center;
    }
  }
}
@media (min-width: 150px) {
  .container {
    max-width: 150px;
  }
}

@media (min-width: 475px) {
  .container {
    max-width: 475px;
  }
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
  .item {
    height: 96%;
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
