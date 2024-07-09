import axios from 'axios'

// api to aetch data from server
const schedulerServices = {}

schedulerServices.createTask = async (added) => {
  const res = await axios({
    method: 'POST',
    url: 'tasks/',
    data: { ...added },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

schedulerServices.updateTask = async (id, updatedData) => {
  await axios({
    method: 'PUT',
    url: `tasks/${id}`,
    data: { ...updatedData },
    headers: { 'Content-type': 'application/json' }
  })
}

schedulerServices.deleteTask = async (id) => {
  await axios({
    method: 'DELETE',
    url: `tasks/${id}`
  })
}

export default schedulerServices
