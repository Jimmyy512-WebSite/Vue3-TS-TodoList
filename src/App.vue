<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { useBaseStore } from './store/modules/base';
  const fullscreenLoading = ref(false);
  const baseStore = useBaseStore();
  //全局loading監聽
  watchEffect(() => {
    fullscreenLoading.value = baseStore.loading.valueOf();
  });
</script>

<template>
  <router-view v-loading.fullscreen.lock="fullscreenLoading"> </router-view>
</template>

<style></style>
