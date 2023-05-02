// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express();

server.use(express.json())

//    [GET]     
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
})
//   [GET]  R  in Crud FETCH
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: ` user id: ${id} does not exist` })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({ message: `Error fetching User ${req.params.id}:${err.message}` })
    }
})

//  [Post]    C in CRUD  !!CREATE!!

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: "please provide name and bio"
            })
        } else {
            const createdUser = await User.insert({ name, bio })
            console.log(createdUser)
            req.body
            res.status(201).json(createdUser)
        }
    } catch (err) {
        res.status(500).json({ message: `Error Creating User:${err.message}` })
    }
})

//   [PUT]    (U in Crud: UPDATE)

server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(res.body)
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({
                message: `please provide name and bio`
            })
        }
        else {
            const updatedUser = await User.update(id, { name, bio })
            if (!updatedUser) {
                res.status(404).json({
                    message: `${id} does not exist`
                })
            }
            else {
                res.json( 
                    updatedUser
                    
                    
            )
        }
    }
}
    catch (err) {
            res.status(404).json({
                message:
                    `Error updating User:${err.message}`
            })
        }
    })


// [Delet]  D in CRUD 

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if( !deletedUser ) {
            res.status(404).json({
                message: `User id ${id} does not exist`
            })
        } else {
            
            res.json(deletedUser
                
            
            )
        }
    }catch (err) {
        res.status(500).json({
            message : `error Deleting User: ${err.message} `
        })
    }
})





module.exports = server; // EXPORT YOUR SERVER instead of {}
