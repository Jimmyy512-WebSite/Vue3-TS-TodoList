<template>
  <div id="TodoFooter">
    {{ showInfo }}
  </div>
</template>

<script setup lang="ts">
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
