import axios, { AxiosResponse } from "axios";


let instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b7dc338d-75bb-43db-9901-b14a7eecf51a'
  }
})


export type TodoType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type CommonResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}
type MeResponseType = {
  id: number
  email: string
  login: string
}
export type CreateAndRemoveTaskType = {
  addedDate: string
  deadline: null
  description: null
  id: string
  order: number
  priority: TaskPriorities
  startDate: null
  status: TaskStatuses
  title: string
  todoListId: string
}

export type UpdateTaskModelType = {
  title?: string
  description?: null
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: null
  deadline?: null
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

type TasksType = {
  [key: string]: Array<CreateAndRemoveTaskType>
}
//
//
// type Type<T = string, D, F> = {
//     string: D
//     number: F
//     value: T
// }
//
// let obj: Type<number> = {
//     string: 'sgsf',
//     number: 443,
//     value: 434



export const todolistApi = {
  getTodos() {
    return instance.get<Array<TodoType>>('todo-lists')

  },
  createTodo(title: string) {
    //any - в настройках аксиоса Т(смотреть ctrl post)
    return instance.post<any, AxiosResponse<CommonResponseType<{ item: TodoType }>>, { title: string }>('todo-lists', { title })

  },
  deleteTodo(todoID: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${todoID}`)
  },
  updateTodoTitle(todoID: string, title: string) {
    return instance.put<CommonResponseType>(`todo-lists/${todoID}`, { title })

  }
}
export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<CommonResponseType<{ item: CreateAndRemoveTaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<CreateAndRemoveTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  //в дженериках мы пишем то, что нам возвращает промис
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId: number }>>('/auth/login', data)
  },
  logout() {
    return instance.delete('/auth/login')
  },
  me() {
    return instance.get<CommonResponseType<MeResponseType>>('/auth/me')
  }
}

