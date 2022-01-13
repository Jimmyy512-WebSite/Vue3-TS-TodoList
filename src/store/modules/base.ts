import { defineStore } from 'pinia';
import { getTodoList } from '/@/api/sys/todoList';

interface baseState {
  token: undefined;
  name: String;
}

export const useBaseStore = defineStore({
  id: 'base',
  state: (): baseState => {
    return {
      token: undefined,
      name: 'jim',
    };
  },
  actions: {
    //直接在這邊呼叫axios的寫法
    // getTodoList(): Promise<GetTodoListModel> {
    //   return axios.get<GetTodoListModel, any>('http://localhost:3087/todolist');
    // },
    async getTodoList3() {
      return await getTodoList();
    },
  },
});
