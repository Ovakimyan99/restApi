const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {name: 'Тигран', value: '8 901 383883', id: v4(), marked: false}
]

// req - принимаемые даннные, res - отдаваемые

// За счет этой счтрочки можно работать с req в post
app.use(express.json())

// GET - если делается гет запрос на такой то url, мы возвращаем json данные
app.get('/api/contacts', (req, res) => {
    // LOADER - искуственный показ, тк запрос особо быстрый
    // setTimeout(() => {
    //     res.status(200).json(CONTACTS)
    // }, 1000)
    res.status(200).json(CONTACTS)
})

// POST
app.post('/api/contacts', (req, res) => {
    // req.body - значения в формаочках
    // res.json({test: 1}) - отдает клиенту новый этот объект
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contact/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'успешно удалено'})
})

// PUT
app.put(`/api/contact/:id`, (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))

