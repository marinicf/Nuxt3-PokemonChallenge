<template>
  <div>
    <canvas ref="pokemonStatsChart" width="400" height="200"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChart } from 'chart.js';

const pokemonStatsChartRef = ref(null);

const pokemonStats = {
  hp: 80,
  attack: 90,
  defense: 70,
  speed: 60,
  specialAttack: 85,
  specialDefense: 75,
};

const labels = Object.keys(pokemonStats);
const data = Object.values(pokemonStats);

onMounted(() => {
  const ctx = pokemonStatsChartRef.value.getContext('2d');

  useChart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Pokemon Stats',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>
