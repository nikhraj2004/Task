import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import axios from 'axios'

const GanttChart = (props) => {
  const [tasks, setTasks] = useState([])

  // runs whenever the component will load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('tasks/')
        setTasks(res.data.tasks)
      } catch (err) {
        props.history.push('/login')
      }
    }

    fetchTasks()
  }, [])

  const rows = []
  // populating data to rows to generate gantt chart.
  for (const task of tasks) {
    const row = []
    row.push(
      task._id,
      task.title,
      new Date(task.startDate),
      new Date(task.endDate),
      null,
      null,
      null
    )
    rows.push(row)
  }

  // Populatind data to columns to generate gantt chart
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' }
  ]

  const handleClick = () => {
    props.history.push('/task')
  }

  return (
    <>
      <button className='btn' onClick={handleClick}>
        Back
      </button>
      <div id='errors' />
      <div style={{ display: 'flex', padding: '10px ' }}>
        <Chart
          width='100%'
          height='700px'
          chartType='Gantt'
          loader={<div>Loading Chart</div>}
          data={[columns, ...rows]}
          // chartEvents={[
          //   {
          //     eventName: 'error',
          //     callback: async ({ Chart, google }) => {
          //       // console.log(google)
          //       google.visualization.events.addListener(Chart, 'error', (err) => {
          //         err.message = 'est'
          //       })
          //       // google.visualization.errors.addError(document.getElementById('errors'), 'Temp')
          //       // await google.setOnLoadCallback(addError)
          //     }
          //   }
          // ]}
        />
      </div>
    </>
  )
}

export default GanttChart
