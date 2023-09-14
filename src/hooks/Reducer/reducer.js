
export const initialState = {
    showCompleted: false,
    sort: 'difficulty',
    itemsPerPage: 3,

}


export const stateReducer = (state, action) => {
    switch (action.type) {
        case "changeShow": {
            return { ...state, showCompleted: action.payload }
        }
        case "changeSort": {
            return { ...state, sort: action.payload }
        }
        case "changeTasksNum": {
            return { ...state, itemsPerPage: action.payload }
        }
        default: return state
    }
}