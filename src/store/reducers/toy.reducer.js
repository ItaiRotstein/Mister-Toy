
const initialState = {
    toys: [],
    filterBy: {
        txt: '',
        inStock: 'all',
        labels: [],
        sort: 'name'
    },
}

export function toyReducer(state = initialState, action) {

    var toys

    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            return { ...state, toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case 'SAVE_TOY':
            toys = state.toys.map(currTodo =>
                (currTodo._id === action.toy._id) ? action.toy : currTodo)
            return { ...state, toys }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}
