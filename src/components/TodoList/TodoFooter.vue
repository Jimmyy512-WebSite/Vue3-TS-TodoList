<template>
  <div id="TodoFooter">
    {{ showInfo }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity';

  const props = defineProps({
    listNum: Number,
  });
  const showInfo = computed(() => {
    return `還有 ${props.listNum}個任務未完成`;
  });
</script>

<style lang="scss" scoped>
  #TodoFooter {
    padding: 10px;
  }
</style>
