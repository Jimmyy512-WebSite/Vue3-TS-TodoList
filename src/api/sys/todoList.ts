import {
  AddTodoParamModel,
  AddTodoResultModel,
  DeleteTodoParamModel,
  DeleteTodoResultModel,
  GetTodoListModel,
  PatchTodoParamModel,
  PatchTodoResultModel,
} from './model/todoListModel';
import axios from '/@/utils/axios';
enum API {
  TodoList = '/todolist',
}
export function getTodoList() {
  return axios.request<GetTodoListModel[]>({
    method: 'GET',
    url: `${API.TodoList}`,
  });
}

export function addTodo(param: AddTodoParamModel) {
  return axios.request<AddTodoResultModel>({
    method: 'POST',
    url: `${API.TodoList}`,
    data: param,
  });
}

export function deleteTodo(param: DeleteTodoParamModel) {
  return axios.request<DeleteTodoResultModel>({
    method: 'DELETE',
    url: `${API.TodoList}/${param.id}`,
  });
}

export function patchTodo(param: PatchTodoParamModel) {
  return axios.request<PatchTodoResultModel>({
    method: 'PATCH',
    url: `${API.TodoList}/${param.id}`,
    data: param,
  });
}
