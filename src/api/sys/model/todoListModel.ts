export interface GetTodoListModel {
  id: number;
  title: string;
  status: number;
}

export interface AddTodoParamModel {
  title: string;
  status: number;
}

export interface AddTodoResultModel {
  id: number;
  title: string;
  status: number;
}

export interface DeleteTodoParamModel {
  id: number;
}

export interface DeleteTodoResultModel {}

export interface PatchTodoParamModel {
  id: number;
  title?: string;
  status?: number;
}

export interface PatchTodoResultModel {}
