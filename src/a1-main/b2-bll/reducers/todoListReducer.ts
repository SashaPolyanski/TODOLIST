import { Dispatch } from "redux";
import { AppRootStateType } from "../store";
import { todolistApi } from "../../b3-dal/todolistApi";
import { RequestStatusType, setStatus } from "./appReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
  name: 'todolist',
  initialState: initialState,
  reducers: {
    RemoveTL(state, action: PayloadAction<{ tlID: string }>) {
      const index = state.findIndex(f=>f.id === action.payload.tlID)
      if(index > -1) {
        state.splice(index, 1)
      }
    },
    AddTl(state, action: PayloadAction<{ title: string, tlId: string }>) {
      state.unshift({
        id: action.payload.tlId,
        title: action.payload.title,
        filter: 'ALL',
        addedDate: '',
        order: 0,
        entityStatus: 'succeeded'
      })
    },
    ReNameTl(state, action: PayloadAction<{ id: string, title: string }>) {
      const index = state.findIndex(f=>f.id === action.payload.id)
      state[index].title = action.payload.title
    },
    ChangeFilterTl(state, action: PayloadAction<{ id: string, value: FilterValueType }>) {
      const index = state.findIndex(f=>f.id === action.payload.id)
      state[index].filter = action.payload.value
    },
    SetTodos(state, action: PayloadAction<{ todos: Array<TodosType> }>) {
      return action.payload.todos.map(t => ({ ...t, filter: 'ALL', entityStatus: 'idle' }))
    },
    setEntityStatus(state, action: PayloadAction<{ id: string, entity: RequestStatusType }>) {
      const index = state.findIndex(f=>f.id === action.payload.id)
      state[index].entityStatus = action.payload.entity
    },
  }

})
export const todolistReducer = slice.reducer
export const { RemoveTL, SetTodos, AddTl, ChangeFilterTl, ReNameTl, setEntityStatus } = slice.actions



//types
export type RemoveTLAcType = ReturnType<typeof RemoveTL>
export type AddTlAcType = ReturnType<typeof AddTl>
export type SetTodosType = ReturnType<typeof SetTodos>
export type FilterValueType = 'ALL' | 'COMPLETED' | 'ACTIVE'
export type TodolistDomainType = TodosType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
}


//Actions create
// export const RemoveTL = (tlID: string) => {
//   return {
//     type: 'REMOVE-TL',
//     payload: {
//       tlID
//     }
//   } as const
// }
// export const AddTl = (title: string, tlId: string) => {
//   return {
//     type: 'ADD-TL',
//     payload: {
//       title,
//       tlId
//     }
//   } as const
// }
// export const ReNameTl = (id: string, title: string) => {
//   return {
//     type: 'RENAME-TL',
//     payload: {
//       id,
//       title
//     }
//   } as const
// }
// export const ChangeFilterTl = (id: string, value: FilterValueType) => {
//   return {
//     type: 'CHANGE-FILTER',
//     payload: {
//       id,
//       value
//     }
//   } as const
// }
//Добавляем as const, что бы типизация typeof , ReturnType воспринимаю type, как константу, а не простую строку
//Желательно Ac лучше типизировать через ReturnType
export type TodosType = {
  addedDate: string
  id: string
  order: number
  title: string
}
// export const SetTodos = (todos: Array<TodosType>) => {
//   return {
//     type: 'SET-TODOS',
//     todos
//   } as const
//
// }
// export const setEntityStatus = (id: string, entity: RequestStatusType) => {
//   return {
//     type: 'APP/SET-ENTITY-STATUS',
//     id,
//     entity
//
//   } as const
// }


//thunk, thunk принимает в себя первым параметром dispatch, вторым параметром принимает в себя getState, третий - экстра аргументы
//thunk предназначен для side effect, dispatch action
export const FetchTodosThunk = () => (dispatch: Dispatch, getState: AppRootStateType) => {
  dispatch(setStatus({ status: 'loading' }))
  todolistApi.getTodos()
    .then((res) => {
      dispatch(SetTodos({ todos: res.data }))
      dispatch(setStatus({ status: 'succeeded' }))
    })

}
export const CreateTodoThunk = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))

  todolistApi.createTodo(title)
    .then((res) => {
      //Что бы не было конфликта id на сервере и в стейте, мы с стейт должны засетать ту id, которая пришла с сервера
      //Генерировать id с помощью v1() нет смысла, на сервере будет одна, в стейте другая
      dispatch(AddTl({ title, tlId: res.data.data.item.id }))
      dispatch(setStatus({ status: 'succeeded' }))
    })

}
export const RemoveTodoThunk = (tlId: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))
  dispatch(setEntityStatus({ id: tlId, entity: 'loading' }))
  todolistApi.deleteTodo(tlId)
    .then(() => {
      dispatch(RemoveTL({ tlID: tlId }))
      dispatch(setStatus({ status: 'succeeded' }))
      dispatch(setEntityStatus({ id: tlId, entity: 'succeeded' }))
    })
}
export const ChangeTodoTitleThunk = (tlId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))
  todolistApi.updateTodoTitle(tlId, title)
    .then((res) => {
      dispatch(ReNameTl({ id: tlId, title }))
      dispatch(setStatus({ status: 'succeeded' }))
    })
}