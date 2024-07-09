import React, { createContext, useReducer, useEffect } from 'react'
import { taskReducer } from '../reducers/TaskReducer'
import axios from 'axios'

export const TaskContext = createContext()

const TaskContextProvider = (props) => {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('tasks/')
        if (res.status === 200) {
          dispatch({ type: 'GET_TASK', tasks: res.data.tasks })
        }
      } catch (err) {
        if (err.response.status === 401) {
          props.handleError('Please login to visit this page!!')
        } else {
          props.handleError("Can't get tasks")
        }
      }
    }

    fetchTasks()
  }, [])

  // console.log(tasks)
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider
