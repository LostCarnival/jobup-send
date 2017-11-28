const initialState = []

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        action.payload
      ]
    case 'EDIT_TASK':
      return state.map((item, index) => {
        if(index !== action.id) {
          return item
        }
        return {
          ...item,
          ...action.payload
        }
      })
    case 'DELETE_TASK':
      return state.filter((item, index) =>
        index !== action.id
      )
    case 'persist/REHYDRATE':
      return {
        ...state,
        persistedState: action.payload
      }
    default:
      return state
  }
}

export default tasksReducer