<template>
  <div id="TodoList" v-loading="loading">
    <h1>代辦清單</h1>
    <TodoHeader
      v-model="newTodoInput"
      @addTodo="addTodoAPI"
      @editTitle="handleEditTitle"
    ></TodoHeader>
    <TodoContent
      :todoList="todoListData"
      @deleteClick="handleDeleteClick"
      @checkClick="handleCheckClick"
    ></TodoContent>
  </div>
</template>

<script setup lang="ts">
  import TodoHeader from '../components/TodoList/TodoHeader.vue';
  import TodoContent from '../components/TodoList/TodoContent.vue';
  import { ref } from 'vue';
  import { useBaseStore } from '../store/modules/base';
  import { GetTodoListModel } from '../api/sys/model/todoListModel';
  import { ElMessage } from 'element-plus';

  const baseStore = useBaseStore();
  let newTodoInput = ref('');
  let loading = ref(false);
  let todoListData = ref<GetTodoListModel[]>([]);

  //* 獲取Todo列表
  const getTodoListAPI = async () => {
    loading.value = true;
    let res = await baseStore.getTodoList();
    console.log('getTodoListAPI res:', res);
    todoListData.value = res.data;
    loading.value = false;
  };

  //* 添加Todo
  const addTodoAPI = async () => {
    if (newTodoInput.value === '') {
      ElMessage({
        type: 'error',
        message: '新增成功',
      });
      return;
    }
    loading.value = true;
    let res = await baseStore.addTodo({
      title: newTodoInput.value,
      status: 0,
    });
    todoListData.value.push(res.data);
    console.log('addTodoAPI res:', res);
    loading.value = false;
    newTodoInput.value = '';
    ElMessage({
      type: 'success',
      message: '新增成功',
    });
  };

  //* 刪除指定todo
  const handleDeleteClick = async (idArr: number[]) => {
    loading.value = true;
    let promiseList = idArr.map((id) => baseStore.deleteTodo({ id }));
    Promise.all(promiseList)
      .then((res) => {
        console.log('res:', res);
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
        loading.value = false;
      });
  };

  const handleCheckClick = async (idArr: number[]) => {
    loading.value = true;
    let promiseList = idArr.map((id) => baseStore.patchTodo({ id, status: 1 }));
    Promise.all(promiseList)
      .then((res) => {
        console.log('res:', res);
        idArr.forEach((id) => {
          const indexPos = todoListData.value.map((it) => it.id).indexOf(id);
          todoListData.value[indexPos].status = 1;
        });
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const handleEditTitle = async (param) => {
    console.log('ggggg', param);
    // console.log('wtf:', id, editTitle);
    // loading.value = true;

    // let res = await baseStore.patchTodo({
    //   id,
    //   title: editTitle,
    // });
    // console.log('handleEditTitle res:', res);
    // loading.value = false;
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
  }
</style>
