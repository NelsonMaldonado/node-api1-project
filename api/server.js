// BUILD YOUR SERVER HERE
const express = require("express")
const res = require("express/lib/response")
const mod = require("./users/model.js")

const server = express()
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" })
  } else {
    mod
      .insert(req.body.name, req.bio)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message,
        })
      })
  }
  console.log("You posted an API")
})

server.get("/api/users", (req, res) => {
  mod
    .find()

    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
        error: err.message,
      })
    })
})

server.get("/api/users/:id", (req, res) => {
  mod
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" })
      }
      res.json(user)
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user information could not be retrieved",
        error: err.message,
      })
    })
})

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params
  mod
    .remove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).json(deletedUser)
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `${error.message}` })
    })
})
module.exports = server // EXPORT YOUR SERVER instead of {}
