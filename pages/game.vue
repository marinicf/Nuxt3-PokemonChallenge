<template>
  <div v-if="gameStarted" class="container">
    <div class="item item-1">
      <h1>Who's that Pokémon?</h1>
      <div v-if="targetPokemon">
        <h2 v-if="gameResult && targetPokemon">{{ targetPokemon.name }}</h2>
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
          alt="Random Pokémon"
          disabled
        />
      </div>
      <input
        class="guess"
        :class="gameResult ? 'success' : ''"
        v-model="userGuess"
        type="text"
        @keyup="checkGuess"
        :disabled="gameResult"
      />
      <p>{{ guessedCount }}/151</p>
      <div class="container">
        <button @click="stopGame">Stop</button>
        <button @click="getRandomPokemon" :disabled="fetching">Skip</button>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <h1>{{ gameResultMessage }}</h1>
      <button @click="startGame">Restart</button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const pokemonStore = usePokemonStore();
const { pokemons } = storeToRefs(pokemonStore);

const userGuess = ref('');
const gameStarted = ref(true);
const targetPokemon = ref('');
const gameResult = ref(false);
const fetching = ref(false);
let blacklist = [],
  N = 152,
  currentPokemon = 0;

//const guessedPokemons = reactive(new Array(151).fill(null));
const guessedPokemons = reactive([]);
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
};
const stopGame = () => {
  gameStarted.value = false;
};

const addToPokedex = (pokemonId, pokemon) => {
  pokemonStore.addPokemon(pokemonId, pokemon);
};

const checkGuess = () => {
  if (userGuess.value) {
    if (userGuess.value.toLowerCase() === targetPokemon.value.name) {
      gameResult.value = true;
      guessedPokemons.push(targetPokemon.value);

      addToPokedex(targetPokemon.value.id, targetPokemon.value);

      blacklist.push(currentPokemon);
      console.log(blacklist.length);
      setTimeout(() => {
        getRandomPokemon();
      }, 2000);
    }
    if (guessedPokemons.length >= 151) {
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

const guessedCount = computed(() => guessedPokemons.length);

onMounted(() => {
  startGame();
});
</script>

<style scoped lang="scss">
.blackout {
  filter: brightness(0%);
}

.item {
  text-align: center;
  padding: 1rem 6rem;
  border: 0.3125rem solid rgb(76, 187, 174);
  color: rgb(0, 0, 0);
  border-width: 7px;
  border-style: solid;
  border-image: linear-gradient(to bottom, rgb(2, 255, 18), rgba(0, 0, 0, 0)) 1
    100%;
  background-color: rgb(247, 247, 247);
}

.container {
  display: flex;
  justify-content: space-evenly;
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
    border-color: #52fd03 transparent transparent transparent;

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
</style>
