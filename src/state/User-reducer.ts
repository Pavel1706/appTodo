type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: 'INCREMENT-AGE' | 'INCREMENT-CHILDREN-COUNT'
    [key: string]: any
}


export const userReducer = (state: StateType, action: AllActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age: state.age + 1
            };
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default :
            throw new Error('I didn`t catch it')
    }
}

const changeNameAC = (newName: string) => {
    return {
        type: 'CHANGE-NAME',
        newName: newName
    } as const
}
type ChangeNameType = ReturnType<typeof changeNameAC>
type AllActionType = ActionType | ChangeNameType