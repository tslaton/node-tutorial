// Third-party
const mongoose = require('mongoose')

// Connect to mongodb
const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
mongoose.connect(`mongodb://${db_user}:${db_pass}@${db_host}`)