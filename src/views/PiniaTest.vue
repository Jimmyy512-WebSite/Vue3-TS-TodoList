<template>
  <div class="PiniaTest">
    <el-row :gutter="20">
      <el-col :span="4"><div>Num:</div></el-col>
      <el-col :span="2">
        <div>{{ demoStore.testNum }}</div>
      </el-col>
      <el-col :span="4"><div>getter範例</div></el-col>
      <el-col :span="6">
        <div>{{ demoStore.formatTestNum }}</div>
      </el-col>
    </el-row>
    <OptionControlVue />
  </div>
</template>

<script setup lang="ts">
  import { useDemoStore } from '@/store/modules/demo';
  import OptionControlVue from '../components/Demo/OptionControl.vue';
  const demoStore = useDemoStore();
</script>

<style lang="scss" scoped>
  @import '@/components/Demo/index.scss';
  .PiniaTest {
    width: 600px;
    margin: 50px auto;
    background-color: whitesmoke;
    padding: 20px;
    .el-col {
      margin-bottom: $rowMarginBottom;
    }
  }
</style>
