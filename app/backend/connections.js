module.exports = {
  connectRedis: (redis, PORT) => {
    const client = redis.createClient(PORT)

    client.on('connect', () => console.log('Connected to Redis!'))
    client.on('error', () => console.log('Error connecting to Redis...'))

    return client
  },
  connectMongoDB: mongoose => {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tinypozt-iujtx.mongodb.net/main?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    const db = mongoose.connection
    db.once('open', () => console.log('connected to MongoDB'))
    db.on('error', () => console.log('error connecting to mongoDB'))
  }
}
