<template>
  <div @click="handleClick"> This is About Page </div>
</template>
<script setup>
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  const handleClick = () => {
    console.log('path1:', route.path);
    console.log('path2:', router);
    router.push({
      path: '/home',
    });
  };
</script>
