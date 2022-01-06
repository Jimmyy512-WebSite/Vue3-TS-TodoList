<script setup lang="ts">
import { ref } from "vue";
let port = ref(import.meta.env.VITE_PORT);
import.meta.env.VITE_PORT
setInterval(() => {
  port.value++
  console.log(port);
}, 1000)
</script>

<template>
  <div>vite port:</div>
  <div>{{ port }}</div>
</template>
