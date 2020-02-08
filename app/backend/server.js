/* PACKAGES */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const app = express()

/* MONGODB CONNECTION */
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tinypozt-iujtx.mongodb.net/main?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection
db.on('error', () => console.log('error connecting to mongoDB'))
db.once('open', () => console.log('connected to MongoDB'))

app.get('/', (req, res) => {
  res.send('Testing!')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
