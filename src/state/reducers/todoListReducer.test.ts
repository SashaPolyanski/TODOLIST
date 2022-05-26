import {v1} from "uuid";
import {
    AddTl,
    ChangeFilterTl,
    RemoveTL,
    ReNameTl, setEntityStatus,
    SetTodos,
    TodolistDomainType,
    todoListReducer
} from "./todoListReducer";


let tlID1: string
let tlID2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    tlID1 = v1();
    tlID2 = v1();


    startState = [
        {id: tlID1, title: 'what to learn', filter: 'ALL', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: tlID2, title: 'what to buy', filter: 'ALL', addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})


test('correct TL should be removed', () => {


    const endState = todoListReducer(startState, RemoveTL(tlID1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(tlID2);
});


test('correct TL should be add', () => {

    let newTlTitle = 'NewTL'


    const endState = todoListReducer(startState, AddTl(newTlTitle, 'asdasd'))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTlTitle);
});
test('correct TL should be reName', () => {


    let newTitle = 'NEW TODO'

    const endState = todoListReducer(startState, ReNameTl(tlID1, newTitle))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('NEW TODO');
});
test('correct TL should be change filter', () => {


    const endState = todoListReducer(startState, ChangeFilterTl(tlID1, 'ACTIVE'))
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('ACTIVE');
});
test('correct TL should be set to the state', () => {


    const endState = todoListReducer([], SetTodos(startState))
    expect(endState.length).toBe(2);
});
test('correct entityStatus should be change', () => {

    const endState = todoListReducer(startState, setEntityStatus(tlID1, 'loading'))
    expect(endState[0].entityStatus).toBe('loading');
});