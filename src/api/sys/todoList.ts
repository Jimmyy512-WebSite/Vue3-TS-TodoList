import { GetTodoListModel } from './model/todoListModel';
import axios from '/@/utils/axios';
enum API {
  TodoList = '/todolist',
}
export function getTodoList() {
  return axios.request<GetTodoListModel>({
    method: 'GET',
    url: `${API.TodoList}`,
  });

  // return axios.request<GetTodoListModel>({
  //   method: 'GET',
  //   url: `/entries`,
  // });
}
