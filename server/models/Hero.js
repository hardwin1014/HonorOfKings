const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    avatar: String,
    title: String,
    // 英雄分类，战士还是法师...
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    // 评分
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    // 技能
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tops: { type: String }
    }],
    // 顺风出装，逆风出装
    items1:[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2:[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    usageTips: { type: String }
})

module.exports = mongoose.model('Hero', schema)
