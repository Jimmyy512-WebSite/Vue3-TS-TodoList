import { GetTodoListModel } from './model/todoListModel';
import axios from '/@/utils/axios';
enum API {
  TodoList = '/todolist',
}
export function getTodoList() {
  return axios.request<GetTodoListModel>({
    method: 'GET',
    url: `http://localhost:3087${API.TodoList}`,
  });
}
