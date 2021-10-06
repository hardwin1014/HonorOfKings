const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    categories: [{ type: mongoose.SchemaTypes.ObjectID, ref: 'Category' }],
    body: String
})

module.exports = mongoose.model('Article', schema)
