import { TasksStateType } from "../../b1-ui/common/todolistList/Todolist";
import { AddTl, RemoveTL, setEntityStatus, SetTodos } from "./todoListReducer";
import { Dispatch } from "redux";
import { tasksApi, TaskStatuses, UpdateTaskModelType } from "../../b3-dal/todolistApi";
import { AppRootStateType } from "../store";
import { setStatus } from "./appReducer";
import { handleServerAppError, handleServerNetworkError } from "../../b1-ui/utils/errorUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type TasksType = {
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
//
// type ActionsType =
//   ReturnType<typeof removeTask>
//   | ReturnType<typeof addTask>
//   | ReturnType<typeof changeTaskStatus>
//   | ReturnType<typeof changeTaskTitle>
//   | ReturnType<typeof GetTasks>
//   | ReturnType<typeof UpdateTask>


const initialState: TasksStateType = {}
const slice = createSlice({
  name: 'tasksReducer',
  initialState: initialState,
  reducers: {
    removeTask(state, action: PayloadAction<{ id: string, tlID: string }>) {
      const tasks = state[action.payload.tlID];
      const index = tasks.findIndex(t => t.id === action.payload.id)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTask(state, action: PayloadAction<{ task: TasksType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    changeTaskStatus(state, action: PayloadAction<{ tlID: string, id: string, status: TaskStatuses }>) {
    },
    changeTaskTitle(state, action: PayloadAction<{ tlID: string, id: string, title: string }>) {
    },
    GetTasks(state, action: PayloadAction<{ tlID: string, tasks: TasksType[] }>) {
      state[action.payload.tlID] = action.payload.tasks
    },
    UpdateTask(state, action: PayloadAction<{ tlID: string, taskID: string, model: UpdateTaskModelType }>) {
      const tasks = state[action.payload.tlID];
      const index = tasks.findIndex(t => t.id === action.payload.taskID)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(AddTl, (state, action)=>{
      state[action.payload.tlId] = []
    })
    builder.addCase(RemoveTL, (state, action)=>{
      delete state[action.payload.tlID]
    })
    builder.addCase(SetTodos, (state, action)=>{
      action.payload.todos.forEach((tl: any)=>{
        state[tl.id] = []
      })
    })

  }
  //   [SetTodos.type]: (state, action: PayloadAction<{ todos: Array<TodosType> }>)=>{},
  //   [RemoveTL.type]: (state, action: PayloadAction<{ tlID: string }>)=>{},
  //   [AddTl.type]: (state, action: PayloadAction<{ title: string, tlId: string }>)=>{},
  // }

})
export const tasksReducer = slice.reducer
export const { addTask, GetTasks, removeTask, UpdateTask } = slice.actions

// export const tasksReducer = (state = initialState, action: any): TasksStateType => {
//   switch (action.type) {
//
//     case SetTodos.type: {
//       //Делаем для того, что бы убрать undefined при получениее тасок, что бы проект нормально отрисавался
//       let stateCopy = { ...state }
//       action.payload.todos.forEach((m: any) => stateCopy[m.id] = []
//       )
//       return stateCopy
//     }
    // case 'REMOVE-TASK' : {
    //   return {
    //     //Возвращаем объект
    //     ...state,
    //     //Берем его свойство и перезатираем новым с удаленной таской
    //     [action.tlID]: state[action.tlID].filter(t => t.id !== action.id)
    //   }
    // }
    // case 'ADD-TASK': {
    //   // let newTask: TasksType = {
    //   //     id: v1(),
    //   //     title: action.title,
    //   //     status: 1,
    //   //     addedDate: '',
    //   //     deadline: null,
    //   //     description: null,
    //   //     order: 1,
    //   //     startDate: null,
    //   //     priority: 1,
    //   //     todoListId: ''
    //   // }
    //   //
    //   // let copyState = {...state}
    //   // const task = copyState[action.task.todoListId]
    //   // const newTasks = [action.task, ...task]
    //   // copyState[action.task.todoListId] = newTasks
    //   // return copyState
    //   return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    //
    //
    // }
    // case 'UPDATE-TASK' : {
    //   return {
    //     ...state,
    //     [action.tlID]: state[action.tlID].map(m => m.id === action.taskID ? { ...m, ...action.model } : m)
    //   }
    //
    // }
    // case 'CHANGE-TASK-STATUS' : {
    //   return {
    //     ...state,
    //     [action.tlID]: state[action.tlID].map(m => m.id === action.id ? { ...m, status: action.status } : m)
    //   }
    // }
    // case "CHANGE-TASK-TITLE" : {
    //   return {
    //     ...state,
    //     [action.tlID]: state[action.tlID].map(m => m.id === action.id ? { ...m, title: action.title } : m)
    //   }
    // }
//     case AddTl.type: {
//       return {
//         ...state,
//         [action.payload.tlId]: []
//       }
//     }
//     case RemoveTL.type: {
//       let copy = { ...state }
//       delete copy[action.payload.tlID]
//       return copy
//
//     }
//
//     default:
//       return state
//   }
//
// }

// export const removeTask = (id: string, tlID: string) => {
//   return {
//     type: 'REMOVE-TASK', id, tlID
//
//   } as const
// }
// export const addTask = (task: TasksType) => {
//   return {
//     type: 'ADD-TASK', task
//   } as const
// }
// export const changeTaskStatus = (tlID: string, id: string, status: TaskStatuses) => {
//   return {
//     type: "CHANGE-TASK-STATUS", tlID, id, status
//   } as const
// }
// export const changeTaskTitle = (tlID: string, id: string, title: string) => {
//   return {
//     type: 'CHANGE-TASK-TITLE', tlID, id, title
//   } as const
// }

// export const GetTasks = (tlID: string, tasks: TasksType[]) => {
//   return {
//     type: 'GET-TASKS',
//     tlID,
//     tasks
//   } as const
// }
// export const UpdateTask = (tlID: string, taskID: string, model: UpdateTaskModelType) => {
//   return {
//     type: 'UPDATE-TASK',
//     tlID,
//     taskID,
//     model
//   } as const
// }


//thunk
export const FetchTasksThunk = (tlId: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))
  tasksApi.getTasks(tlId)
    .then((res) => {
      dispatch(GetTasks({tlID: tlId,tasks: res.data.items }))
      dispatch(setStatus({ status: 'succeeded' }))
    })
}
export const RemoveTaskThunk = (id: string, tlID: string) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(tlID, id)
    .then((res) => {
      dispatch(removeTask({id: id, tlID }))
    })
}
export const AddTaskThunk = (tlId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))
  dispatch(setEntityStatus({ id: tlId, entity: 'loading' }))
  tasksApi.createTask(tlId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTask({task: res.data.data.item }))
        dispatch(setStatus({ status: 'succeeded' }))
        dispatch(setEntityStatus({ id: tlId, entity: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }


    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })

}
export const UpdateTaskThunk = (tlId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setEntityStatus({ id: tlId, entity: 'loading' }))
  const allTask = getState().tasks
  const TasksForTodo = allTask[tlId]
  const currentTask = TasksForTodo.find(f => f.id === taskId)
  if (currentTask) {
    const apiModel: UpdateTaskModelType = {
      title: currentTask.title,
      status: currentTask.status,
      startDate: currentTask.startDate,
      priority: currentTask.priority,
      deadline: currentTask.deadline,
      description: currentTask.description,
      ...model
    }

    tasksApi.updateTask(tlId, taskId, apiModel)

      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(UpdateTask({tlID: tlId,taskID: taskId,model: apiModel }))
          dispatch(setEntityStatus({ id: tlId, entity: 'succeeded' }))
        } else {
          //что бы не дублировать код, нам нужно часть кода засунуть в функцию
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

//Уточнить на саппорте про изменение таски (чекбокса и тайтла) в одной функции. Через приходящий model
//В теории принимаем целый model и меняем, надо будет уточнить


