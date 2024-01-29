<template>
  <div class="flex-container">
    <div class="header-card">
      <div class="flex-name">
        <h3 class="name">
          {{ `#${pokemonId} ${selectedPokemon.name.toUpperCase()}` }}
        </h3>
      </div>
      <div class="flex-sprite">
        <img
          v-if="selectedPokemon.abilities"
          class="pokedexImage"
          :src="selectedPokemon.sprites.other['official-artwork'].front_default"
          alt=""
        />
        <img v-else src="~assets/images/greenMark.png" alt="" class="mark" />
      </div>
      <div class="flex-type">
        <div class="type" v-for="(type, index) in selectedPokemon.types">
          <img :src="getImageUrl(type.type.name)" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="flex-stats-container">
      <div class="stats-item" v-for="stat in selectedPokemon.stats">
        <p>{{ `${getStatsName(stat.stat.name)} -> ${stat.base_stat}` }}</p>
      </div>
    </div> -->
    <div class="stats-container">
      <!-- <PokemonStatsChart></PokemonStatsChart> -->
      <div class="table-stats">
        <table>
          <tr v-for="stat in selectedPokemon.stats">
            <th class="stat-img">
              <img :src="getStatsImageUrl(stat.stat.name)" alt="" />
            </th>
            <th>{{ `${getStatsName(stat.stat.name)}` }}</th>
            <td>
              <div class="stat-bar">
                <div
                  class="stat"
                  :style="{ width: `${(stat.base_stat / 200) * 100}%` }"
                >
                  {{ `${stat.base_stat}` }}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
const getImageUrl = (t) => {
  return new URL(`/assets/images/pokemon_types/${t}.png`, import.meta.url);
};
const getStatsImageUrl = (s) => {
  return new URL(`/assets/images/stats/${s}.png`, import.meta.url);
};
const uppercase = computed(() => pokemonName.value.toUpperCase());
const getStatsName = (stat) => {
  switch (stat) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'special-attack':
      return 'Sp. Atk';
    case 'special-defense':
      return 'Sp. Def';
    case 'speed':
      return 'Speed';
    default:
      stat;
  }
};

const route = useRoute();
const pokemonId = ref(route.params.id);

const pokemonStore = usePokemonStore();
const selectedPokemon = ref(pokemonStore.getPokemonById(pokemonId.value));

onMounted(() => {
  if (process.client && window) {
    window.history.scrollRestoration = 'auto';
  }
});
</script>
<style lang="scss">
.flex-container {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background-color: rgb(255, 255, 255);
  border: 10px inset rgb(14, 189, 216);

  .header-card {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: stretch;
    align-content: stretch;
    text-align: center;
    padding: 3rem 0;

    .flex-name {
      height: 4rem;

      text-align: center;
      border: 1px solid rgb(66, 182, 221);
      justify-content: space-around;
      .name {
        margin: 0;
        padding-top: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 2rem;
      }
    }
    .flex-sprite {
      height: auto;
      width: auto;
      text-align: center;
      border-left: 1px solid rgb(66, 182, 221);
      border-right: 1px solid rgb(66, 182, 221);
      .pokedexImage {
        width: auto;
        height: auto;
      }
      .mark {
        margin-top: 70px;
        width: 300px;
        height: 300px;
      }
    }
    .flex-type {
      height: 5rem;
      text-align: center;
      padding-top: 1rem;
      border: 1px solid rgb(66, 182, 221);
      display: flex;
      flex-direction: row;
      justify-content: center;
      .type {
        padding: 10px;
      }
      .unknownImg {
        border-radius: 1px;
      }
    }
  }
  .flex-stats-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: stretch;
    align-content: stretch;
    text-align: center;
    padding: 4rem 0;

    .stats-item {
      padding: 0 5rem;
      font-size: 1.9rem;
      border: 1px solid rgb(0, 0, 0);
    }
  }
  .stats-container {
    margin-top: 40px;
    .table-stats {
      table {
        border: 1px inset rgb(66, 182, 221);
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      /* Style for table header cells */
      th {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: left;
      }

      /* Style for table data cells */
      td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }

      /* Alternate row background color for better readability */
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      /* Add hover effect to table rows */
      tr:hover {
        background-color: #e6e6e6;
      }
      .stat-bar {
        border: 1px solid;
        border-radius: 10px;
        width: 15rem;
        margin: 1rem 0 0 0;
        text-align: center;
        .stat {
          background-color: rgb(66, 182, 221);
          border-radius: 10px;
        }
      }
    }
  }
}
@media (min-width: 150px) {
  .flex-container {
    min-width: 150px;
    .header-card {
      padding: 0;
      .flex-sprite {
        .pokedexImage {
          width: 300px;
          height: 300px;
        }
      }
    }
  }
}

@media (min-width: 475px) {
  .flex-container {
    // background-color: red;
    .header-card {
      padding: 0;
      margin-top: 1rem;
    }
    .flex-stats-container {
      margin-left: 2rem;
    }
  }
}
@media (min-width: 640px) {
  .flex-container {
    // background-color: green;
    .header-card {
      padding: 0;
      .flex-sprite {
        .pokedexImage {
          width: auto;
          height: auto;
        }
      }
    }
    .flex-stats-container {
      margin-left: 3.8rem;
    }
  }
}
@media (min-width: 768px) {
  .flex-container {
    // background-color: blue;
    .header-card {
      padding: 2.9rem;
      margin-top: 1rem;
      .flex-sprite {
        .pokedexImage {
          width: auto;
          height: auto;
        }
      }
    }
    .flex-stats-container {
      margin-left: 5.8rem;
    }
  }
}
@media (min-width: 1024px) {
  .flex-container {
    // background-color: rgb(187, 0, 255);
    .header-card {
      padding: 4rem 0;
      .flex-sprite {
        .pokedexImage {
          width: auto;
          height: auto;
        }
      }
      .flex-name {
        margin-top: 0;
      }
    }
    .stats-container {
      margin-top: 100px;
    }
  }
}
@media (min-width: 1280px) {
}
@media (min-width: 1536px) {
}
</style>
