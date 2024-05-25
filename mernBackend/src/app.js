// This code sets up a basic Express.js server that interacts with a MongoDB database using Mongoose

const express = require("express"); // importing Express.js framework
const path = require("path")        // Node.js path module
const app = express();              // creating instance of express application
require("./db/connect")             // importing the code that connects to the mongodb database
const Register = require("./models/registers") // importing the databse schema

// const port = process.env.PORT || 3000;: This line sets the port number for the server. It uses the environment variable PORT if it is defined; otherwise, it defaults to port 3000.
const port = process.env.PORT || 3000;

// setting path to the static files (HTML, CSS)
const static_path = path.join(__dirname, "../public")
const redirectPath = path.join(__dirname, "../public/redirect.html");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// to serve static files from the public directory
app.use(express.static(static_path))

app.get("/", (req, res) => {
    res.send("Hello from the WT project database")
});

// create a new user in our database
app.post("/signup", async(req, res) => {
    try {
        const password = req.body.password; // storing the password entered by user in variable 'password'

        if(password) // if user has entered a password
        {
            const registerUser = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password
            })
        
            const registered = await registerUser.save();
            res.status(201).redirect("/redirection.html"); // 201 -> status code for request successful
        } 

        else {
            res.send("Please enter a password.") 
        }
    } catch(error) {
        res.status(400).send(error)
    }
})

app.post("/signin", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password; 

        const useremail = await Register.findOne({email:email})

        if(useremail.password === password) {
            res.status(201).redirect("/redirection.html");
        } else {
            res.send("Invalid password")
        }


    } catch {
        res.status(400).send("Invalid email")
    }
})

app.listen(port, () =>
{
    console.log('server is running')
});