<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部" name="all">User</el-tab-pane>
    <el-tab-pane label="進行中" name="process">Config</el-tab-pane>
    <el-tab-pane label="已完成" name="done">Role</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  let activeName = ref('first');
  const handleClick = () => {
    console.log('handleClick', activeName.value);
  };
</script>

<style lang="scss" scoped></style>
