<template>
  <div id="TodoList">
    <h1>代辦清單</h1>
    <TodoHeader v-model="newTodoInput" @addTodo="callAddTodoAPI"></TodoHeader>
    <TodoContent></TodoContent>
    <!-- <TodoHeaderVue :newTodoInput="newTodoInput" @changeEvent="changeEvent"></TodoHeaderVue> -->
  </div>
</template>

<script setup lang="ts">
  import TodoHeader from '../components/TodoList/TodoHeader.vue';
  import TodoContent from '../components/TodoList/TodoContent.vue';
  import { ref } from 'vue';
  import { useBaseStore } from '../store/modules/base';

  // 直接呼叫axios的方法
  // const $axios = inject('$axios') as Axios;
  // $axios.get('http://localhost:3087/todolist').then((res) => {
  //   console.log('res:', res.data);
  // });
  const baseStore = useBaseStore();
  let newTodoInput = ref('');
  const callAddTodoAPI = async () => {
    console.log('callAddTodoAPI');
    let res = await baseStore.getTodoList3();
    console.log('res:', res);
  };

  // const callGetTodoAPI = () => {
  //   $axios.get('http://localhost:3087/todolist').then((res) => {
  //     console.log('res:', res.data);
  //   });
  // };
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
