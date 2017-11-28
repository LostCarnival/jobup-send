export default {
  addNewTask: (task) => {
    return {
      type: 'ADD_TASK',
      payload: task
    }
  },
  deleteTask: (id) => {
    return {
      type: 'DELETE_TASK',
      id
    }
  },
  editTask: (id, task) => {
    return {
      type: 'EDIT_TASK',
      id,
      payload: task
    }
  }
}