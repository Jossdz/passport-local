const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
 username: String,
 password: String 
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at" 
}
})

module.exports = mongoose.model('User', userSchema)