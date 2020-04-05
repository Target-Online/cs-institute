export const observerReducer = (state, action) => {
    switch (action.type) {
        case 'added':
            return {
                ...state,
                collection: state.collection.some(d => d.id == action.doc.id) ? state.collection : state.collection.concat(action.doc)
            };
        case 'modified':
            return {
                ...state,
                collection: state.collection.filter(m => m.id != action.doc.id).concat(action.doc)
            };
        case 'removed':
            return {
                ...state,
                collection: state.collection.filter(m => m.id != action.doc.id)
            };
        case 'setSearch':
            return {
                ...state,
                search: action.search
            };
        case 'setInProgress':
            return {
                ...state,
                inProgress: action.inProgress
            };
        default:
            return state;
    }
}

export const setStateReducer = (state, action) => {
    switch (action.type) {
        case 'setData':
            return {
                ...state,
                data: action.data
            };
        case 'setInProgress':
            return {
                ...state,
                inProgress: action.inProgress
            };
        case 'setSearch':
            return {
                ...state,
                search: action.search
            };
        default:
            return state;
    }
}