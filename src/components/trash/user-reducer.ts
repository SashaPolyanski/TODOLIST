type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE' :

            // state.age = state.age +1
            return {...state, age: state.age+1};
        case 'INCREMENT-CHILDREN' :
            state.childrenCount = state.childrenCount + 1
            return state;
         case 'CHANGE-NAME' :
                return {...state, name: state.name = action.newName}

        default:
            throw new Error('U stupid!')
    }

}


export const incrementAgeAC = () => {
    //Должна возвращать объект
    return(
        {type: 'INCREMENT-AGE'}
    )
}
export const incrementChildrenAC = () => {
    return(
        {type: 'INCREMENT-CHILDREN'}
    )
}
export const changeNameAC = (newName: string) => {
    return(
        {type: 'CHANGE-NAME', newName}
    )
}