<template>
  <div class="card">
    <h3 class="card-id">#{{ id }}</h3>
    <div class="card-body">
      <img :src="sprite" alt="" />
      <h5 class="card-name">{{ name }}</h5>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  id: Number,
  sprite: String,
  name: String,
});
</script>
<style scoped lang="scss">
.card {
  margin: 10px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
