<template>
  <div class="rowContainer">
    <div class="rowTitle">單數增減:</div>
    <div class="rowContent">
      <el-button type="primary" @click="demoStore.minNum()">-</el-button>
      <el-button type="primary" @click="demoStore.addNum()">+</el-button>
    </div>
  </div>

  <div class="rowContainer">
    <div class="rowTitle">設置數字:</div>
    <div class="rowContent flex">
      <el-input class="mr-50px" v-model="numberInput" placeholder="Please input" />
      <el-button type="success" @click="handleSetClick"> 點擊設置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useDemoStore } from '@/store/modules/demo';
const demoStore = useDemoStore();
const numberInput = ref();
const handleSetClick = () => {
  if (numberInput.value === undefined) {
    ElMessage({
      message: '設置失敗 輸入值為空,請再次確認。',
      type: 'error',
    });
    return;
  }
  demoStore.setNum(numberInput.value);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
