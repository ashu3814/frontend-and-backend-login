const express = require("express")
const path = require("path")
const app = express()

// Importing the LogInCollection from "./mongo"
const LogInCollection = require("./mongo")

const port = process.env.PORT || 3000

// Middleware to parse JSON data
app.use(express.json())

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }))

// Setting up paths for templates and static files
const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

// Setting the view engine and views directory
app.set('view engine', 'hbs')
app.set('views', templatePath)

// Serving static files from the public directory
app.use(express.static(publicPath))

// Route for the signup page (GET request)
app.get('/signup', (req, res) => {
    res.render('signup')
})

// Route for the home page (GET request)
app.get('/', (req, res) => {
    res.render('login')
})

// Route for submitting the signup form (POST request)
app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    // Checking if the username already exists in the database
    const checking = await LogInCollection.findOne({ name: req.body.name })

    try {
        if (checking.name === req.body.name && checking.password === req.body.password) {
            res.send("User details already exist")
        } else {
            await LogInCollection.insertMany([data])
        }
    } catch {
        res.send("Wrong inputs")
    }

    res.status(201).render("home", {
        naming: req.body.name
    })
})

// Route for submitting the login form (POST request)
app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        } else {
            res.send("Incorrect password")
        }
    } catch (e) {
        res.send("Wrong details")
    }
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on port', port);
})
