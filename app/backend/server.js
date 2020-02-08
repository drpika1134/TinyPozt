/* PACKAGES */
require('dotenv').config()
const mongoose = require('mongoose')

/* EXPRESS */
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()

const postRoutes = require('./routes/post')

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

app.use('/api', postRoutes)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
