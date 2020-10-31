const mongoose = require('mongoose')
const config = require('../config/config')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(config.db.host + config.db.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB