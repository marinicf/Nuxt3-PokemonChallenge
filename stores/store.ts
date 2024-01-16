import { defineStore } from 'pinia';

const arrayOfGuessedPokemons = Array.from({ length: 151 }, (_, index) => ({}));

export const usePokemonStore = defineStore({
  id: 'pokemon-store',
  state: () => {
    return { pokemons: arrayOfGuessedPokemons };
  },
  actions: {
    addPokemon(id: number, guessedPokemon: {}) {
      let targetIndex = id - 1;
      this.pokemons.splice(targetIndex, 1, guessedPokemon);
    },
  },
  getters: {
    getPokemonById: (state) => {
      return (id: number) =>
        state.pokemons.find((element, index) => {
          index === id ? element : false;
        });
    },
  },
});
