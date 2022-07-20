import { Dispatch } from "redux";
import { AppRootStateType } from "../store";
import { todolistApi } from "../../a1-main/b3-dal/todolistApi";
import { RequestStatusType, setStatus } from "./appReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
  name: 'todolist',
  initialState: initialState,
  reducers: {
    RemoveTL(state, action: PayloadAction<{ tlID: string }>) {
    },
    AddTl(state, action: PayloadAction<{ title: string, tlId: string }>) {
    },
    ReNameTl(state, action: PayloadAction<{ id: string, title: string }>) {
    },
    ChangeFilterTl(state, action: PayloadAction<{ id: string, value: FilterValueType }>) {
    },
    SetTodos(state, action: PayloadAction<{ todos: Array<TodosType> }>) {
    },
    setEntityStatus(state, action: PayloadAction<{ id: string, entity: RequestStatusType }>) {
    },
  }

})
export const todolistReducer = slice.reducer
export const { RemoveTL, SetTodos, AddTl, ChangeFilterTl, ReNameTl, setEntityStatus } = slice.actions

export const todoListReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOS":
      return action.todos.map(t => ({ ...t, filter: 'ALL', entityStatus: 'idle' }))

    case 'REMOVE-TL' :
      return state.filter(f => f.id !== action.payload.tlID)
    case "APP/SET-ENTITY-STATUS":
      return state.map(f => f.id === action.id ? { ...f, entityStatus: action.entity } : f)

    case 'ADD-TL' :
      return [{
        id: action.payload.tlId,
        title: action.payload.title,
        filter: 'ALL',
        addedDate: '',
        order: 0,
        entityStatus: 'idle'
      }, ...state]

    case "RENAME-TL":
      return state.map(m => m.id === action.payload.id ? { ...m, title: action.payload.title } : m)

    case "CHANGE-FILTER":
      return state.map(m => m.id === action.payload.id ? { ...m, filter: action.payload.value } : m)


    default:
      return state

  }
}

//types
type ActionsType =
  ReturnType<typeof RemoveTL> |
  ReturnType<typeof AddTl> |
  ReturnType<typeof ReNameTl> |
  ReturnType<typeof ChangeFilterTl> |
  ReturnType<typeof SetTodos> |
  ReturnType<typeof setEntityStatus>
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
      dispatch(setEntityStatus({id: tlId,entity: 'succeeded' }))
    })
}
export const ChangeTodoTitleThunk = (tlId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatus({ status: 'loading' }))
  todolistApi.updateTodoTitle(tlId, title)
    .then((res) => {
      dispatch(ReNameTl({id: tlId, title }))
      dispatch(setStatus({ status: 'succeeded' }))
    })
}