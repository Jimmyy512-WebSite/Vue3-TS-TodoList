import { GetTodoListModel } from './model/todoListModel';
import axios from '/@/utils/axios';
enum API {
  TodoList = '/todolist',
}
export function getTodoList() {
  let test = import.meta.env.VITE_PORT;
  import.meta.env.BASE_URL;
  import.meta.env.DEV;
  console.log('test:', test);
  return axios.request<GetTodoListModel>({
    method: 'GET',
    url: `http://localhost:3087${API.TodoList}`,
  });
}
