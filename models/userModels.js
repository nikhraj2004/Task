




const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

// users table schema
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  tasks: [
    {
      title: { type: String, default: '' },
      endDate: { type: Date },
      startDate: { type: Date },
      allDay: { type: Boolean, default: false },
      notes: { type: String, default: '' }
    }


  ]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
