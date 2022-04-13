import {TasksStateType} from "../Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {AddTlAc, RemoveTLAc} from "./todoListReducer";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        'tlID1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'SASS', isDone: true},
        ],
        'tlID2': [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'REACT', isDone: true},
            {id: '3', title: 'REDUX', isDone: true},
        ],
    };
})


test('delete task', () => {

    const action = removeTaskAC('2', 'tlID2');
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].title).toBe('REDUX')
    expect(endState['tlID2'][1].id).toBe('3')
    expect(endState['tlID2'].length).toBe(2)
})
test('add task', () => {

    const action = addTaskAC('juice', 'tlID2');
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'].length).toBe(4)
    expect(endState['tlID2'][0].title).toBe('juice')
    expect(endState['tlID2'][0].id).toBeDefined()
})
test('Change task status', () => {

    const action = changeTaskStatusAC('tlID2', '2', false);
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].isDone).toBe(false)
    expect(endState['tlID1'][1].isDone).toBe(true)
})
test('Change task title', () => {


    const action = changeTaskTitleAC('tlID2', '2', 'TS');
    let endState = tasksReducer(startState, action)

    expect(endState['tlID2'][1].title).toBe('TS')
    expect(endState['tlID1'][1].title).toBe('CSS')
})
test('add tl', () => {


    const action = AddTlAc('new tl');
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


    const action = RemoveTLAc('tlID1');
    let endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState['tlID1']).not.toBeDefined()
})

