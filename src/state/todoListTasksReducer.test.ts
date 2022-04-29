import {TasksStateType} from "../Todolist";
import {AddTlAc, TodolistDomainType, todoListReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

xit('ids be equal', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> =[]
    const action = AddTlAc('new todo', 'asdasd');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todoListReducer(startTodolistsState, action)




    const keys = Object.keys(endTasksState);
    const idTasks = keys[0];
    const idTL = endTodolistState[0].id;

    expect(idTasks).toBe(action.payload.tlId)
    expect(idTL).toBe(action.payload.tlId)
})