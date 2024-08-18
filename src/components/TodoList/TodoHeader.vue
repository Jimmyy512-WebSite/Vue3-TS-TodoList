<template>
  <div id="TodoHeader">
    <el-row :gutter="0" class="elRow">
      <el-col :span="4">
        <div class="grid-content titleBlock">{{ $t('TodoHeader.Title') }}</div>
      </el-col>
      <el-col :span="18">
        <el-input
          id="addTodoInput"
          class="elInput"
          v-model="addInput"
          :placeholder="t('TodoHeader.InputPlaceHolder')"
        />
      </el-col>
      <el-col :span="2">
        <el-button id="addTodoInputBtn" type="primary" @click="emit('addTodo')">{{
          t('TodoHeader.Add')
        }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue', 'addTodo']);
const addInput = ref(props.modelValue);
watchEffect(() => {
  emit('update:modelValue', addInput.value);
});
//* 解決當外層v-model變數透過程式改值時,input的值不會更新的問題
watchEffect(() => {
  addInput.value = props.modelValue;
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
