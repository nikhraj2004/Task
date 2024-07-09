// Maintain the state of the application

export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return [...action.tasks]

    case 'ADD_TASK':
      return [...state, { ...action.task }]

    case 'DELETE_TASK':
      return state.filter((task) => task._id !== action.task._id)

    case 'UPDATE_TASK':
      return state.map((task) => {
        if (task._id === action.task._id) {
          Object.assign(task, action.task)
        }
        return task
      })

    default:
      return state
  }
}
