<template>
  <div class="rowContainer">
    <div class="rowTitle">Num:</div>
    <div class="rowContent">{{ demoStore.testNum }}</div>
  </div>

  <div class="rowContainer">
    <div class="rowTitle">Getter 範例:</div>
    <div class="rowContent">{{ demoStore.formatTestNum }}</div>
  </div>
</template>

<script setup lang="ts">
import { useDemoStore } from '@/store/modules/demo';
const demoStore = useDemoStore();
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
