import { defineStore } from 'pinia';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  sprites: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: {
    base_stat: string | number | null;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

export const usePokemonStore = defineStore('PokemonStore', () => {
  const blacklist: Ref<number[]> = ref([]);
  const allPokemons: Ref<Pokemon[]> = ref(
    Array.from({ length: 151 }, (_, index) => ({
      id: index + 1,
      name: `Pokemon`,
      height: Math.floor(Math.random() * 100), // Replace with actual data
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png',
        front_female: null,
        front_shiny: 'url_to_shiny_sprite',
        front_shiny_female: null,
        other: {
          dream_world: {
            front_default: 'url_to_dream_world_sprite',
            front_female: null,
          },
          'official-artwork': {
            front_default: 'url_to_official_artwork_sprite',
            front_shiny: 'url_to_shiny_official_artwork_sprite',
          },
        },
      },
      stats: [
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'hp',
            url: 'url_to_stat_hp',
          },
        },
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'attack',
            url: 'url_to_stat_attack',
          },
        },
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'defense',
            url: 'url_to_stat_defense',
          },
        },
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'special-attack',
            url: 'url_to_stat_hp',
          },
        },
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'special-defense',
            url: 'url_to_stat_hp',
          },
        },
        {
          base_stat: '?',
          effort: Math.floor(Math.random() * 10),
          stat: {
            name: 'speed',
            url: 'url_to_stat_hp',
          },
        },
        // Add more stats as needed
      ],
      types: [
        {
          slot: 1,
          type: {
            name: 'unknown',
            url: 'url_to_type_normal',
          },
        },
        // Add more types as needed
      ],
      weight: Math.floor(Math.random() * 100),
    }))
  );

  const addPokemon = (id: number, guessedPokemon: Pokemon) => {
    let targetIndex = id - 1;
    allPokemons.value.splice(targetIndex, 1, guessedPokemon);
  };

  const getPokemonById = (id: number) => {
    let result = {};
    allPokemons.value.forEach((pokemon) => {
      if (pokemon.id == id) {
        result = pokemon;
      }
    });
    return result;
  };

  const guessedCount = computed(() => blacklist.value.length);

  const progressPercentage = computed(
    () => (blacklist.value.length / 151) * 100
  );

  return {
    blacklist,
    guessedCount,
    allPokemons,
    addPokemon,
    getPokemonById,
    progressPercentage,
  };
});
