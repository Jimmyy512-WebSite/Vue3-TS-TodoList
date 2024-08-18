<script setup lang="ts">
import { useBaseStore } from './store/modules/base';
import PickLang from '@/components/PickLang.vue';
const fullscreenLoading = ref(false);
const baseStore = useBaseStore();
//全局loading監聽
watchEffect(() => {
  fullscreenLoading.value = baseStore.loading.valueOf();
});
</script>

<template>
  <img class="block mx-auto w-30px h-auto mt-10px" src="@/assets/logo.png" alt="" />
  <div class="flex justify-center items-center mt-20px">
    {{ $t('Common.SwitchLanguage') }}
    <PickLang class="m-l-8px" />
  </div>
  <div class="flex justify-center w-full">
    <router-link class="routeLink" to="/todolist">{{ $t('Common.TodoListExample') }}</router-link>
    <router-link class="routeLink" to="/pinia_test">{{ $t('Common.PiniaExample') }}</router-link>
    <router-link class="routeLink" to="/VueUse">{{ $t('Common.VueUseExample') }}</router-link>
  </div>
  <router-view v-loading.fullscreen.lock="fullscreenLoading" />
</template>

<style lang="scss" scoped>
.routeLink {
  @apply block m-[20px_10px_0_10px] font-bold;
}
</style>
