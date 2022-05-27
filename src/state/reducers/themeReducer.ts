export type initType = {
    isDark: boolean
}


const initState: initType = {

    isDark: false
}

export const switchThemeReducer = (state = initState, action: ActionsType): initType => { // fix any
    switch (action.type) {
        case 'SWITCH-THEME': {
            return {...state, isDark: action.theme}
        }
        default:
            return state
    }
}
type ActionsType = ReturnType<typeof switchTheme>


export const switchTheme = (theme: boolean) => {
    return {
        type: 'SWITCH-THEME',
        theme
    } as const
}