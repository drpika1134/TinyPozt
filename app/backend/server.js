require('dotenv').config()
const mongoose = require('mongoose')
const redis = require('redis')
const express = require('express')
const cookieParser = require('cookie-parser')

const { connectRedis, connectMongoDB } = require('./connections')

const PORT = process.env.PORT || 5000
const redisPORT = process.env.REDIS_PORT || 6379

// const client = connectRedis(redis, redisPORT)
connectMongoDB(mongoose)

const app = express()

const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', authRoutes)

app.use('/api', postRoutes)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
