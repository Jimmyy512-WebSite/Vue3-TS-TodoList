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
  <div class="routeBlock">
    <router-link class="routeLink" to="/todolist">代辦清單範例</router-link>
    <router-link class="routeLink" to="/pinia_test">Pinia範例</router-link>
  </div>
  <router-view v-loading.fullscreen.lock="fullscreenLoading" />
</template>

<style lang="scss" scoped>
.routeBlock {
  display: flex;
  justify-content: center;
  .routeLink {
    display: block;
    margin: 20px 10px 0px 10px;
  }
}
</style>
