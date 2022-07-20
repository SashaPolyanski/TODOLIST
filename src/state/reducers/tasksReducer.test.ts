import {TasksStateType} from "../../Todolist";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from "./tasksReducer";
import {AddTl, RemoveTL, SetTodos} from "./todoListReducer";
import {TaskPriorities, TaskStatuses} from "../../a1-main/b3-dal/todolistApi";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        'tlID1': [
            {
                id: '1', title: 'HTML', status: TaskStatuses.Completed,
                todoListId: 'tlID1',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
            {
                id: '2', title: 'CSS', status: TaskStatuses.Completed,
                todoListId: 'tlID1',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
            {
                id: '3', title: 'SASS', status: TaskStatuses.Completed,
                todoListId: 'tlID1',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
        ],
        'tlID2': [
            {
                id: '1', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'tlID2',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
            {
                id: '2', title: 'REACT', status: TaskStatuses.Completed,
                todoListId: 'tlID2',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
            {
                id: '3', title: 'REDUX', status: TaskStatuses.Completed,
                todoListId: 'tlID2',
                startDate: null,
                deadline: null,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: null
            },
        ],
    };
})


test('delete task', () => {

    const action = removeTask('2', 'tlID2');
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].title).toBe('REDUX')
    expect(endState['tlID2'][1].id).toBe('3')
    expect(endState['tlID2'].length).toBe(2)
})
// test('add task', () => {
//
//     const action = addTaskAC('juice', 'tlID2');
//     let endState = tasksReducer(startState, action)
//
//     expect(endState['tlID2'].length).toBe(4)
//     expect(endState['tlID2'][0].title).toBe('juice')
//     expect(endState['tlID2'][0].id).toBeDefined()
// })
test('Change task status', () => {

    const action = changeTaskStatus('tlID2', '2', TaskStatuses.New);
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].status).toBe(TaskStatuses.New)
    expect(endState['tlID1'][1].status).toBe(TaskStatuses.Completed)
})
test('Change task title', () => {


    const action = changeTaskTitle('tlID2', '2', 'TS');
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].title).toBe('TS')
    expect(endState['tlID1'][1].title).toBe('CSS')
})
test('add tl', () => {


    const action = AddTl('new tl', 'asasd');
    let endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKeys = keys.find(k => k != 'tlID1' && k != 'tlID2');
    if (!newKeys) {
        throw Error('u stupid')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKeys]).toEqual([])
})
test('task deleted??', () => {


    const action = RemoveTL('tlID1');
    let endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState['tlID1']).not.toBeDefined()
})

test('empty arrays should be added when we set todo', ()=>{
    const action = SetTodos([
        {id: '1' , title: 'tit1', order: 0, addedDate: ''},
        {id: '2' , title: 'tit2', order: 0, addedDate: ''},
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
