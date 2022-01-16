// BUILD YOUR SERVER HERE
const express = require("express")
const mod = require("./users/model")
const server = express()
server.use(express.json())

server.post('/api/users', async(req,res)=>{
  try{

    const result = await mod.insert(req.body)
    res.status(201).json(result)
  }catch(err){
    res.status(400).json({ message: "Please provide name and bio for the user" })
  }
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

server.put('/api/users/:id', async(req,res)=>{
  const {id} = req.params
  const {name,bio} = req.body
  console.log(id, name, bio)
  
  try{
    const data = await mod.update(id,{name,bio})
    if (!data){
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else{
      res.json(data)
    }
  }catch(err){
    res.status(500).json({ message: "The user information could not be modified" })
  }
  
})


module.exports = server // EXPORT YOUR SERVER instead of {}
