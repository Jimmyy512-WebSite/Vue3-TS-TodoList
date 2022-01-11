<template lang="">
  <div @click="handleClick"> Home </div>
</template>
<script setup>
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  const handleClick = () => {
    console.log('route path:', route.path);
    router.push({
      path: '/about',
    });
  };
</script>
<style lang=""></style>
