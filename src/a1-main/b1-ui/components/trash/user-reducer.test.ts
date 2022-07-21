import {changeNameAC, incrementAgeAC, incrementChildrenAC, userReducer} from "./user-reducer";

test('User reducer should increment age', () => {
        const startState = {age: 20, childrenCount: 2, name: 'Dima'}
        const endState = userReducer(startState, incrementAgeAC())
        expect(endState.age).toBe(21);
        expect(endState.name).toBe('Dima')
    }
)
test('User reducer should increment child', () => {
        const startState = {age: 20, childrenCount: 2, name: 'Dima'}
        const endState = userReducer(startState, incrementChildrenAC())
        expect(endState.age).toBe(20);
        expect(endState.childrenCount).toBe(3)
    }
)
test('user reducer should change name', ()=> {
    const startState = {age: 20, childrenCount: 2, name: 'Dima'}
    let newName = 'Sasha'
    const endState = userReducer(startState, changeNameAC(newName))
    expect(endState.name).toBe('Sasha');
    expect(endState.age).toBe(20)
})

