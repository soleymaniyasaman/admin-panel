const appReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE': {
            return {
                ...state,
                language: action.payload
            }
        }
        case 'CHANGE_THEME': {
            return {
                ...state,
                theme: action.payload
            }
        }
        case 'SIDEBAR_TOGGLE': {
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        }
    }
}

export default appReducer;