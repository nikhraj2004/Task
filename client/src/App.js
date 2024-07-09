import React, { useState } from 'react'
import TaskScheduler from './components/TaskScheduler'
import TaskContextProvider from './contexts/TaskContext'
import Error from './shared/Error'
import PageNotFound from './shared/PageNotFound'
import Register from './components/Register'
import Login from './components/Login'
import GanttChart from './components/GanttChart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const showError = (message) => {
    setMessage(message)
    setError(true)
  }

  return !error ? (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <Register handleError={showError} />
          </Route>
          <Route path='/login'>
            <Login handleError={showError} />
          </Route>
          <Route path='/task' exact>
            <TaskContextProvider handleError={showError}>
              <TaskScheduler handleError={showError} />
            </TaskContextProvider>
          </Route>
          <Route path='/chart' component={GanttChart} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  ) : (
    <Error message={message} />
  )
}

export default App
