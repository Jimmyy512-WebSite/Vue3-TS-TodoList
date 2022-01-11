<template>
  <div id="TodoHeader">
    <el-row :gutter="0" class="elRow">
      <el-col :span="4">
        <div class="grid-content titleBlock"> 代辦事項 </div>
      </el-col>
      <el-col :span="18">
        <el-input class="elInput" v-model="addInput" placeholder="Please input"> </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">新增</el-button>
      </el-col>
    </el-row>
  </div>
  <div>
    props data:
    {{ props.modelValue }}
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  const props = defineProps({
    modelValue: String,
  });
  const emit = defineEmits(['update:modelValue']);
  const addInput = ref(props.modelValue);
  watchEffect(() => {
    emit('update:modelValue', addInput.value);
  });
</script>

<style lang="scss">
  #TodoHeader {
    .elInput {
      height: 100%;
      border-radius: 0;
      border: 0;
      .el-input__inner {
        height: 100%;
        border: 0;
        &:focus {
          border-color: unset;
          border-radius: 0;
        }
      }
    }
    .el-button {
      height: 100%;
      width: 100%;
      border-radius: 0 5px 5px 0;
    }
  }
</style>

<style lang="scss" scoped>
  .elRow {
    border-radius: 5px;
    border: 1px solid gray;

    .titleBlock {
      padding: 10px;
      background-color: rgb(223, 223, 223);
      text-align: center;
      border-radius: 5px 0 0 5px;
      border-right: 1px solid gray;
    }
  }
</style>
