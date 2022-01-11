<template>
  <div id="TodoList">
    <h1>代辦清單</h1>
    <TodoHeaderVue v-model="newTodoInput"></TodoHeaderVue>
    <!-- <TodoHeaderVue :newTodoInput="newTodoInput" @changeEvent="changeEvent"></TodoHeaderVue> -->
  </div>
</template>

<script setup lang="ts">
  import TodoHeaderVue from '../components/TodoList/TodoHeader.vue';
  import { ref } from 'vue';
  let newTodoInput = ref('123');
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
