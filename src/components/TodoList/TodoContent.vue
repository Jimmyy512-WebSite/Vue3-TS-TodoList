<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部" name="all" />
    <el-tab-pane label="進行中" name="process" />
    <el-tab-pane label="已完成" name="done" />
  </el-tabs>

  <div class="todoListContent">
    <el-row :gutter="10" align="middle" v-for="(it, index) in filterTodoList" :key="index">
      <el-col :span="1" class="titleCheckBox">
        <el-checkbox v-model="it.bindData" label="" size="large" />
      </el-col>
      <el-col :span="18" class="title titleInput" @click="handleEditClick(index)">
        <template v-if="selectEditIndex === index">
          <el-input
            v-model="newTitleInput"
            placeholder="請輸入修改值"
            @blur="handleEditInputBlur"
          />
        </template>

        <template v-else>
          {{ it.title }}
        </template>
      </el-col>
      <el-col :span="2"> {{ it.status === 0 ? '進行中' : '已完成' }}</el-col>
      <el-col :span="1.5" class="deleteIcon">
        <el-button
          v-if="it.bindData"
          type="danger"
          :icon="Delete"
          circle
          @click="handleDeleteClick"
      /></el-col>
      <el-col :span="1.5" class="checkIcon">
        <el-button
          v-if="it.bindData && it.status !== 1"
          type="success"
          :icon="Check"
          circle
          @click="handleCheckClick"
      /></el-col>
    </el-row>
  </div>

  <el-row align="middle">
    <el-col />
  </el-row>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, watchEffect, nextTick } from 'vue';
  import { GetTodoListModel } from '@/api/sys/model/todoListModel';
  import { Delete, Check } from '@element-plus/icons-vue';
  import { ElMessageBox } from 'element-plus';
  const emit = defineEmits(['deleteClick', 'checkClick', 'editTitle']);
  const props = defineProps({
    todoList: {
      type: Array as PropType<GetTodoListModel[]>,
      required: true, //如果不加required props.todoList型別有可能會是undefined
    },
  });

  let activeName = ref('all');
  let newTitleInput = ref('');
  let selectEditIndex = ref(-1);
  let todoList = ref<(GetTodoListModel & { bindData: boolean })[]>([]);

  watchEffect(() => {
    todoList.value = props.todoList.map((it) => {
      return { ...it, bindData: false };
    });
  });

  const selectIds = computed(() => todoList.value?.filter((it) => it.bindData).map((it) => it.id));
  const filterTodoList = computed(() => {
    return todoList.value?.filter((it) => {
      if (activeName.value === 'all') return true;
      else if (activeName.value === 'process') {
        return it.status === 0;
      } else if (activeName.value === 'done') {
        return it.status === 1;
      } else {
        console.error('filterTodoList fail', it);
        return false;
      }
    });
  });
  const editTodoData = computed((): GetTodoListModel => {
    return todoList.value?.find(
      (_it, index) => index === selectEditIndex.value
    ) as GetTodoListModel;
  });

  const handleDeleteClick = () => {
    showDeleteTip(selectIds.value?.length);
  };

  const handleCheckClick = () => {
    emit('checkClick', selectIds.value);
  };

  const handleEditInputBlur = () => {
    emit('editTitle', { id: editTodoData.value.id, editTitle: newTitleInput.value });
    selectEditIndex.value = -1;
  };

  const showDeleteTip = (chooseLength) => {
    ElMessageBox.confirm(`您已選則了 ${chooseLength} 個選項,是否確認刪除?`, 'Warning', {
      confirmButtonText: '確定',
      cancelButtonText: '返回',
      type: 'warning',
    }).then(() => {
      emit('deleteClick', selectIds.value);
    });
  };

  const handleEditClick = async (editIndex: number) => {
    selectEditIndex.value = editIndex;
    const title = editTodoData.value?.title;
    newTitleInput.value = title as string;

    await nextTick();
    let button = document.getElementById('test');
    button?.focus();
  };

  const forceEnableFirstSelect = () => {
    todoList.value[0].bindData = true;
  };
  defineExpose({ forceEnableFirstSelect });
</script>

<style lang="scss" scoped>
  .title {
    overflow: auto;
    cursor: pointer;
  }
  .todoListContent {
    max-height: 320px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
