import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  English: {
    type: String,
    lowercase: true,
    required: false,
    trim: true,
    default: ''
  },
  French: {
    type: String,
    lowercase: true,
    required: false,
    trim: true,
    default: ''
  },
  German: {
    type: String,
    lowercase: true,
    required: false,
    trim: true,
    default: ''
  },
  Spanish: {
    type: String,
    lowercase: true,
    required: false,
    trim: true,
    default: ''
  }
})

const Translation = mongoose.model('translation', schema)

export default Translation
