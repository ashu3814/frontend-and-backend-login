const mongoose = require("mongoose")

// Establishing a connection to the MongoDB database
mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
    .then(() => {
        console.log('Mongoose connected')
    })
    .catch((e) => {
        console.log('Connection failed')
    })

// Defining the schema for the login collection
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Creating the model based on the schema
const LogInCollection = new mongoose.model('LogInCollection', logInSchema)

// Exporting the model to be used in other parts of the code
module.exports = LogInCollection
