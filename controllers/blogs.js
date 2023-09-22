const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
    .then(blog => {
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    })
    blog
        .save()
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
    })

blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter