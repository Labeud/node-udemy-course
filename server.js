const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

const app = express()
const port = process.env.PORT || 3000
const user = {
  name: "Alexandre",
  age: 30,
  likes: [
    "Voile",
    "Batterie"
  ]
}
hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear())
hbs.registerHelper("screamIt", (text) => text.toUpperCase())

app.set("view engine", "hbs")
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("Unable to append to server.log")
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {})
// })

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: `Welcome ${user.name}!`
  })
})

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  })
})

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "My projects"
  })
})

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`)
})