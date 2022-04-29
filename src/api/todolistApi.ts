import axios, {AxiosResponse} from "axios";


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4933b13e-4b01-48e2-aaf4-8530ec473dd2'
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
    Moddle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type CommonResponseType<T = { }> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
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
    title: string
    description: null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: null
    deadline: null
}

type TasksType = {
    [key: string]: Array<CreateAndRemoveTaskType>
}

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')

    },
    createTodo(title: string) {
        //any - в настройках аксиоса Т(смотреть ctrl post)
        return instance.post< any, AxiosResponse<CommonResponseType<{item: TodoType}>>, {title: string}>('todo-lists', {title})

    },
    deleteTodo(todoID: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoID}`)
    },
    updateTodoTitle(todoID: string, title: string) {
        return instance.put<CommonResponseType >(`todo-lists/${todoID}`, {title})

    }
}
export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<CommonResponseType<{item: CreateAndRemoveTaskType}>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CreateAndRemoveTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}