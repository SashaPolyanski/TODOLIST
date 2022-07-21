import {appReducer, InitialStateType, setError, setStatus} from "../../../../b2-bll/reducers/appReducer";

let startState: InitialStateType


beforeEach(() => {


    startState = {
        error: null,
        status: 'idle',
        entityStatus: "idle",
        isInitialized: false

    }
})


test('correct error message should be set', () => {


    const endState = appReducer(startState, setError({error:'some error'}))

    expect(endState.error).toBe('some error');
});
test('correct status  should be set', () => {


    const endState = appReducer(startState, setStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
});