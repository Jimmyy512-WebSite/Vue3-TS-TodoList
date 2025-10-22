import { defineStore } from 'pinia';
import {
  AddTodoParamModel,
  DeleteTodoParamModel,
  PatchTodoParamModel,
} from '@/api/sys/model/todoListModel';
import { getTodoList, addTodo, deleteTodo, patchTodo } from '@/api/sys/todoList';

interface baseState {
  token: undefined;
  name: string;
  loading: boolean;
}

export const useBaseStore = defineStore('base', {
  state: (): baseState => {
    return { token: undefined, name: 'jim', loading: false };
  },
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
    async getTodoList() {
      return await getTodoList();
    },
    async addTodo(param: AddTodoParamModel) {
      return await addTodo(param);
    },
    async deleteTodo(param: DeleteTodoParamModel) {
      return await deleteTodo(param);
    },
    async patchTodo(param: PatchTodoParamModel) {
      return await patchTodo(param);
    },
  },
});
