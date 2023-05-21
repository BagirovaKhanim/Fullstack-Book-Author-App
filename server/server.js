const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require("mongoose");
const connectDatabase = require('./helper/connectDatabase');
const Schema = mongoose.Schema;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

//Author Schema
const AuthorSchema = new Schema({
    name: String,
    birthyear: Number,
    genre: String,
    isDead: Boolean,
    isMale: Boolean,
    imageURL: String
});

//Author Model 
const AuthorModel = mongoose.model("AuthorModel", AuthorSchema);

//Mongo Database
connectDatabase()

app.get('/api', (req, res) => {
    res.send('Hello API!')
})

//POST author
app.post('/api/authors', async (req, res) => {
    const { name, birthyear, genre, isDead, isMale, imageURL } = req.body;
    const newAuthor = new AuthorModel({
        name: name,
        birthyear: birthyear,
        genre: genre,
        isDead: isDead,
        isMale: isMale,
        imageURL: imageURL
    })
    await newAuthor.save()
    res.status(201).send("Created!")
})

//Get All Authors
app.get('/api/authors', async (req, res) => {
    const { name } = req.query
    const authors = await AuthorModel.find()
    if (name === undefined) {
        res.status(200).send({
            data: authors,
            message: 'Data get success!'
        })
    }
    else {
        res.status(200).send({
            data: authors.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
            message: "Data get success!"
        })
    }
})

//Get Author By ID
app.get('/api/authors/:id', async (req, res) => {
    const { id } = req.params
    const author = await AuthorModel.findById(id)
    if (!author) {
        res.status(404).send("Author Not Found!")
    }
    else {
        res.status(200).send({
            data: author,
            message: "Author get success!"
        })
    }
})

//Delete Author By ID
app.delete('/api/authors/:id', async (req, res) => {
    const { id } = req.params
    const author = await AuthorModel.findByIdAndDelete(id)
    if (!author) {
        res.status(204).send("Author Not Found!")
    }
    else {
        res.status(200).send("Author deleted!")
    }
})

//Put Author By ID
app.put('/api/authors/:id', async (req, res) => {
    const { id } = req.params
    const { name, birthyear, genre, isDead, isMale, imageURL } = req.body
    const existedAuthor = await AuthorModel.findByIdAndUpdate(id, {
        name: name,
        birthyear: birthyear,
        genre: genre,
        isDead: isDead,
        isMale: isMale,
        imageURL: imageURL
    })
    if (!existedAuthor) {
        res.status(204).send("Author Not Found!")
    }
    else {
        res.status(200).send("Author edited!")
    }
})


PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})