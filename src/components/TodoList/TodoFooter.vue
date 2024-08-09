<template>
  <div id="TodoFooter">
    {{ showInfo }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
  listNum: Number,
});

const showInfo = computed(() => {
  return t('TodoFooter.ShowInfo', { count: props.listNum });
});
</script>

<style lang="scss" scoped>
#TodoFooter {
  padding: 10px;
}
</style>
