const notesRouter = require('express').Router()
const Note = require('../model/note')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
  
const getTokenFrom = request => {
    const auth = request.get('Authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')){
        return auth.substring(7)
    }
    return null
}

notesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important
    }
    response.json(await Note.findByIdAndUpdate(await request.params.id, note, {new: true}))
})

notesRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const obj = jwt.verify(token, process.env.SECRET)
    if(!obj){
        return response.status(401).json({error: "Token invalid or missing"})
    }
    const user = await User.findById(obj.id)
    console.log(`Cuerpo de la solicitud: ${body}`)
    if(!body.content) return response.status(400).json({error: 'Content missing'})
    const note =  new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false,
        user: user.id
    })
    const result = (await note.save()).populate('user', {username: 1, name: 1})
    // console.log(result)
    user.notes = user.notes.concat(result._id)
    await user.save()
    response.json(note)
})

notesRouter.get('/', async (req, response) => {
    const notes = await Note.find({}).populate('user', {username: 1, name: 1})
    response.json(notes)
})

notesRouter.get('/:id', async (request, response) => response.json(await Note.findById(request.params.id)))

module.exports = notesRouter