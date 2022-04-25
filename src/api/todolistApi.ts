import axios, {AxiosResponse} from "axios";


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4933b13e-4b01-48e2-aaf4-8530ec473dd2'
    }
})
type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonResponseType<T = { }> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type CreateAndRemoveTaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
}

type ChangeTitleTaskType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null
    deadline: null
    addedDate: string
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
        return instance.post<CreateAndRemoveTaskType>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CreateAndRemoveTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string){
        return instance.put<ChangeTitleTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}