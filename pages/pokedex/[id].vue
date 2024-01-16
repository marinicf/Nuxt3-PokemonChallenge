<template>
  <div class="flex-container">
    <div class="header">
      <div class="flex-name">
        <h3 class="name">#{{ pokemonId }} Name</h3>
      </div>
      <div class="flex-sprite"></div>
      <div class="flex-type"></div>
    </div>
    <div class="stats">
      <div class="flex-hp">
        <p>HP - 7</p>
      </div>
      <div class="flex-attack">
        <p>Attack - 7</p>
      </div>
      <div class="flex-defense">
        <p>Defense - 7</p>
      </div>
      <div class="flex-spAtk">
        <p>Sp. Atk - 7</p>
      </div>
      <div class="flex-spDef">
        <p>Sp Def. - 7</p>
      </div>
      <div class="flex-speed">
        <p>Speed - 7</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const pokemonStore = usePokemonStore();
const { pokemons } = storeToRefs(pokemonStore);

const route = useRoute();
const pokemonId = ref(route.params.id);
</script>
<style lang="scss">
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: rgb(212, 212, 212);
  border: 1px solid;

  .header {
    text-align: center;
    padding: 4rem 4rem;
    border: 1px solid rgb(55, 193, 25);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: stretch;
    align-content: stretch;

    .flex-name {
      height: 2rem;
      text-align: center;
      padding: 1rem 1rem;
      border: 1px solid red;
      justify-content: space-around;
      .name {
        margin: 0px;
      }
    }
    .flex-sprite {
      height: 19rem;
      text-align: center;
      padding: 1rem 17rem;
      border: 1px solid red;
    }
    .flex-type {
      height: 10rem;
      text-align: center;
      padding: 1rem 17rem;
      border: 1px solid red;
      display: flex;
    }
  }
  .stats {
    text-align: center;
    padding: 4rem 2rem;
    border: 1px solid rgb(55, 193, 25);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
    .flex-hp {
      height: 3rem;
      text-align: center;
      padding: 0rem 1rem;
      border: 1px solid red;
    }
    .flex-attack {
      height: 3rem;
      text-align: center;
      padding: 0rem 17rem;
      border: 1px solid red;
    }
    .flex-defense {
      height: 3rem;
      text-align: center;
      padding: 0rem 17rem;
      border: 1px solid red;
    }
    .flex-spAtk {
      height: 3rem;
      text-align: center;
      padding: 0rem 17rem;
      border: 1px solid red;
    }
    .flex-spDef {
      height: 3rem;
      text-align: center;
      padding: 0rem 17rem;
      border: 1px solid red;
    }
    .flex-speed {
      height: 3rem;
      text-align: center;
      padding: 0rem 17rem;
      border: 1px solid red;
    }
  }
}
</style>
