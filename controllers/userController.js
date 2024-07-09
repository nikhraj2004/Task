const User = require('../models/userModels')
const passport = require('passport')

const userQueries = {}

// create and authenticate user
userQueries.createUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const newUser = new User({ username })
    await User.register(newUser, password)
    passport.authenticate('local')(req, res, () => {
      res.status(200).json()
    })
  } catch (err) {
    console.log(err)
    res.status(500).json()
  }
}

module.exports = { userQueries }
