<template>
  <div id="TodoList">
    <h1>代辦清單</h1>
    <TodoHeader v-model="newTodoInput" @addTodo="addTodoAPI"></TodoHeader>
    <TodoContent
      :todoList="todoListData"
      @deleteClick="handleDeleteClick"
      @checkClick="handleCheckClick"
      @editTitle="handleEditTitle"
    ></TodoContent>
    <div class="line"></div>
    <TodoFooterVue :listNum="unFinishNum"></TodoFooterVue>
  </div>
</template>

<script setup lang="ts">
  import TodoHeader from '../components/TodoList/TodoHeader.vue';
  import TodoContent from '../components/TodoList/TodoContent.vue';
  import TodoFooterVue from '../components/TodoList/TodoFooter.vue';
  import { computed, ref } from 'vue';
  import { useBaseStore } from '../store/modules/base';
  import { GetTodoListModel } from '../api/sys/model/todoListModel';
  import { ElMessage } from 'element-plus';

  const baseStore = useBaseStore();
  let newTodoInput = ref('');
  let todoListData = ref<GetTodoListModel[]>([]);
  // 計算進行中任務的數量
  let unFinishNum = computed(() => todoListData.value.filter((it) => it.status === 0).length);

  //* 獲取Todo列表
  const getTodoListAPI = async () => {
    baseStore.setLoading(true);
    let res = await baseStore.getTodoList();
    console.log('getTodoListAPI res:', res);
    todoListData.value = res.data;
    baseStore.setLoading(false);
  };

  //* 添加Todo
  const addTodoAPI = async () => {
    if (newTodoInput.value === '') {
      ElMessage({
        type: 'error',
        message: '新增失敗,請檢查是否有正確輸入',
      });
      return;
    }
    baseStore.setLoading(true);
    let res = await baseStore.addTodo({
      title: newTodoInput.value,
      status: 0,
    });
    todoListData.value.push(res.data);
    baseStore.setLoading(false);
    newTodoInput.value = '';
    ElMessage({
      type: 'success',
      message: '新增成功',
    });
  };

  //* 刪除指定todo
  const handleDeleteClick = async (idArr: number[]) => {
    baseStore.setLoading(true);
    let promiseList = idArr.map((id) => baseStore.deleteTodo({ id }));
    Promise.all(promiseList)
      .then(() => {
        idArr.forEach((id) => {
          const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
          todoListData.value.splice(indexPos, 1);
        });
        ElMessage({
          type: 'success',
          message: '刪除成功',
        });
      })
      .finally(() => {
        baseStore.setLoading(false);
      });
  };

  //* 變更選取選項的狀態'已完成'
  const handleCheckClick = async (idArr: number[]) => {
    baseStore.setLoading(true);
    let promiseList = idArr.map((id) => baseStore.patchTodo({ id, status: 1 }));
    Promise.all(promiseList)
      .then(() => {
        idArr.forEach((id) => {
          const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
          todoListData.value[indexPos].status = 1;
        });
      })
      .finally(() => {
        baseStore.setLoading(false);
      });
  };

  //* 變更選取標題
  const handleEditTitle = async ({ id, editTitle }) => {
    baseStore.setLoading(true);
    let res = await baseStore.patchTodo({
      id,
      title: editTitle,
    });
    const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
    todoListData.value[indexPos] = res.data;
    baseStore.setLoading(false);
  };

  getTodoListAPI();
</script>

<style lang="scss" scoped>
  #TodoList {
    h1 {
      text-align: center;
    }
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    .line {
      background-color: rgb(202, 199, 199);
      width: 100%;
      height: 1px;
    }
  }
</style>
