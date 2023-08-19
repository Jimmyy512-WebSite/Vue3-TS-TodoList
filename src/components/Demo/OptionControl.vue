<template>
  <el-row align="middle">
    <el-col :span="titleSpan">
      <div>單數增減:</div>
    </el-col>

    <el-button type="primary" @click="demoStore.minNum()">-</el-button>
    <el-button type="primary" @click="demoStore.addNum()">+</el-button>
  </el-row>

  <el-row align="middle">
    <el-col :span="titleSpan">
      <div>設置數字:</div>
    </el-col>
    <el-col :span="6">
      <el-input v-model="numberInput" placeholder="Please input" />
    </el-col>
    <el-col :span="2" />
    <el-col :span="1">
      <el-button type="success" @click="handleSetClick"> 點擊設置</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { ref } from 'vue';
  import { useDemoStore } from '@/store/modules/demo';
  const titleSpan = 4;
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
  @import '@/components/Demo/index.scss';
  .el-row {
    margin-bottom: $rowMarginBottom;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>
