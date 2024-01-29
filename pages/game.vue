<template>
  <div class="container">
    <div class="item item-1">
      <h1>Who's that Pokémon?</h1>
      <div v-if="targetPokemon">
        <h2 class="poke-name" v-if="gameResult && targetPokemon">
          {{ targetPokemon.name }}
        </h2>
        <div class="lds-ring" v-if="fetching">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img
          v-if="!fetching"
          :src="targetPokemon.sprites.other['official-artwork'].front_default"
          :class="gameResult ? '' : 'blackout'"
          class="sprite"
          alt="Random Pokémon"
          disabled
          ref="myInput"
        />
      </div>
      <input
        class="guess"
        :class="gameResult ? 'success' : ''"
        v-model="userGuess"
        type="text"
        @keyup="checkGuess"
        :disabled="gameResult"
        autofocus
      />
      <p>{{ guessedCount }}/151</p>
      <div class="container-control">
        <button @click="stopGame">Reset</button>
        <button @click="getRandomPokemon" :disabled="fetching">Skip</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const pokemonStore = usePokemonStore();
const { blacklist } = pokemonStore;

const userGuess = ref('');
const gameStarted = ref(true);
const targetPokemon = ref('');
const gameResult = ref(false);
const fetching = ref(false);
//let blacklist = [],
let N = 152;
let currentPokemon = 0;

const getRandomPokemon = async () => {
  userGuess.value = '';

  let randomPokemonId = getRandomPokemonId();

  fetching.value = true;
  const { data } = await useFetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`
  );
  gameResult.value = false;
  fetching.value = false;

  targetPokemon.value = data.value;
};
const startGame = () => {
  getRandomPokemon();
  gameStarted.value = true;
  //guessedCount.value = 0;
  //myInput.value.focus()
};
const stopGame = () => {
  gameStarted.value = false;
  pokemonStore.guessedCount = 0;
};

const addToPokedex = (pokemonId, pokemon) => {
  pokemonStore.addPokemon(pokemonId, pokemon);
};

const checkGuess = () => {
  if (userGuess.value && targetPokemon.value) {
    if (userGuess.value.toLowerCase() === targetPokemon.value.name) {
      //fetching.value = true;
      gameResult.value = true;

      addToPokedex(targetPokemon.value.id, targetPokemon.value);

      blacklist.push(currentPokemon);
      setTimeout(() => {
        getRandomPokemon();
      }, 2000);
    }
    if (blacklist.values.length >= 151) {
      gameStarted.value = false;
    }
  }
};

const getRandomPokemonId = () => {
  let validPokemonIDs = [], //Array that will store the valid numbers within the range [n, N). Whitelist valid pokemon IDs
    guessedPokemons = new Set(blacklist), //Set containing the blacklisted numbers.
    countOfValidIDs = N - guessedPokemons.size, //Count of valid IDs (range [n, N)), excluding the blacklisted ones. (152 - lenght)  count of valid IDs
    m = new Map(); //Map that will store a mapping from blacklisted numbers to their corresponding valid replacement.

  //This loop fills the array a with valid Pokemon IDs, excluding those in the blacklist.
  for (let i = countOfValidIDs; i < N; i++) {
    if (guessedPokemons.has(i)) continue;
    validPokemonIDs.push(i);
  }
  let validReplacementIndex = 0;

  //This loop creates a mapping from blacklisted numbers to their corresponding valid replacements in the m Map.
  for (const x of guessedPokemons) {
    if (x < countOfValidIDs) {
      m.set(x, validPokemonIDs[validReplacementIndex]);
      validReplacementIndex++;
    }
  }

  let randomId = parseInt(Math.random() * countOfValidIDs) + 1; //Get random number range 1-151
  //If randomId is found in the m Map, it means it corresponds to a blacklisted Pokemon ID
  if (m.has(randomId)) {
    currentPokemon = m.get(randomId);
    return m.get(randomId);
  }
  //If it's finde exact match
  currentPokemon = randomId;
  return randomId;
};

const gameResultMessage =
  'Congratulations! You guessed the all Pokémons correctly.';

const guessedCount = computed(() => pokemonStore.guessedCount);

onMounted(() => {
  startGame();
});
</script>

<style scoped lang="scss">
.blackout {
  filter: brightness(0%);
  //opacity: 0;
}

.item {
  text-align: center;
  width: 100%;
  height: 100%;
  // padding: 1rem 6rem;
  border: 0.3125rem solid rgb(76, 187, 174);
  color: rgb(0, 0, 0);
  border-width: 7px;
  border-style: solid;
  border-image: linear-gradient(to bottom, rgb(3, 3, 3), rgba(0, 0, 0, 0)) 1
    100%;
  background-color: rgb(247, 247, 247);
}

.container {
  display: flex;
  justify-content: space-evenly;
}

.container-control {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
}

.guess {
  padding: 10px 20px;
  border-radius: 30px;
}

.success {
  background-color: rgb(40, 217, 40);
}

.failed {
  background-color: rgb(253, 0, 0);
}

button {
  font-size: 16px;
  border-radius: 30px;
  padding: 10px 15px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgb(140, 135, 135);
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #03fde4 transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 475px) {
  .container {
    max-width: 475px;
  }
  .sprite {
    width: 300px;
    height: 300px;
  }
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
  .sprite {
    width: 400px;
    height: 400px;
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
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
