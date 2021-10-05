const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 英雄名字
    name: String,
    // 头像
    avatar: String,
    // 称号
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
        tips: { type: String }
    }],
    // 顺风出装，逆风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 使用技巧
    usageTips: { type: String },
    // 对战技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)
