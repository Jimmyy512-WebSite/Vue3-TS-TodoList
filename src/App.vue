<script setup lang="ts">
  import { ref } from 'vue';
  let port = ref(import.meta.env.VITE_PORT);
  import.meta.env.VITE_PORT;
  setInterval(() => {
    port.value++;
  }, 1000);
</script>

<template>
  <div class="title">vite por222t:</div>
  <div class="content">{{ port }}</div>
</template>

<style lang="less">
  .title {
    color: @link-color;
  }
  .content {
    color: @link-color;
  }
</style>
