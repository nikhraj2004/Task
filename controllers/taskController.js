const User = require('../models/userModels')

// Data access object
const taskQueries = {}

taskQueries.getAllTasks = async (req, res) => {
  try {
    // authenticate user
    if (!req.user) {
      return res
        .status(401)
        .json()
    }

    const userId = req.user._id

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const tasks = user.tasks
    res.status(200).json({ tasks })
  } catch (e) {
    res.status(500).json({ message: "Can't get tasks" })
  }
}

taskQueries.createTask = async (req, res) => {
  try {
    const { title, endDate, startDate, allDay, notes = '' } = req.body

    // authenticate user
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'Please login to visit this page!!' })
    }

    const userId = req.user._id

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    user.tasks.push({ title, endDate, startDate, allDay, notes })
    await user.save()

    const id = user.tasks[user.tasks.length - 1]._id
    res.status(201).json({ _id: id, title, endDate, startDate, allDay, notes })
  } catch (e) {
    res.status(500).json({ message: "Can't add Task" })
  }
}

taskQueries.updateTask = async (req, res) => {
  try {
    // authenticate user
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'Please login to visit this page!!' })
    }

    const userId = req.user._id
    const taskId = req.params.id

    const updatedTask = req.body

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const index = user.tasks.findIndex((task) => task._id == taskId)

    if (index !== -1) {
      Object.assign(user.tasks[index], updatedTask)
      await user.save()
      return res
        .status(200)
        .json({ message: `Task modified with ID: ${taskId}` })
    }

    return res
      .status(404)
      .json({ message: `Can't find task with id ${taskId}` })
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .json({ message: `Can't update task of ${req.params.id} id` })
  }
}

taskQueries.deleteTask = async (req, res) => {
  try {
    // authenticate user
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'Please login to visit this page!!' })
    }

    const userId = req.user._id
    const taskId = req.params.id

    // find user
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const index = user.tasks.findIndex((task) => task._id == taskId)

    if (index !== -1) {
      user.tasks.splice(index, 1)
      await user.save()
      return res
        .status(200)
        .send({ message: `Task deleted with ID: ${taskId}` })
    }

    return res
      .status(404)
      .json({ message: `Can't find task with id ${taskId}` })
  } catch (e) {
    res
      .status(500)
      .json({ message: `Can't delete subtask of id ${req.params.id}` })
  }
}

module.exports = { taskQueries }
