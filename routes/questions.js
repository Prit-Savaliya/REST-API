const express = require('express')
const router = express.Router()
const Question = require('../models/question')

// Getting all
router.get('/',async (req,res)=>{
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (err) {
        res.status(500).json({message: err.message})
    } 
})

// Getting one
router.get('/:id',getQuestion,(req,res)=>{
    res.json(res.question)
})

// Creating one
router.post('/',async (req,res)=>{
    const question = new Question({
        que: req.body.que,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        ans: req.body.ans,
        level: req.body.level,
        area: req.body.area
    })

    try {
        const newQuestion = await question.save()
        res.status(201).json(newQuestion)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Updating one
router.patch('/:id',getQuestion,async (req,res)=>{
    if(req.body.que!=null){
        res.question.que=req.body.que
    }
    if(req.body.option1!=null){
        res.question.option1=req.body.option1
    }
    if(req.body.option2!=null){
        res.question.option2=req.body.option2
    }
    if(req.body.option3!=null){
        res.question.option3=req.body.option3
    }
    if(req.body.option4!=null){
        res.question.option4=req.body.option4
    }
    if(req.body.ans!=null){
        res.question.ans=req.body.ans
    }
    if(req.body.level!=null){
        res.question.level=req.body.level
    }
    if(req.body.area!=null){
        res.question.area=req.body.area
    }
    
    try {
        const updatedQuestion = await res.question.save()
        res.json(updatedQuestion)
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// Deleting one
router.delete('/:id',getQuestion,async (req,res)=>{
    try {
        await res.question.remove()
        res.json({message: "Deleted Subscriber"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getQuestion(req,res,next){
    let question
    try {
        question = await Question.findById(req.params.id)
        if (question == null){
            return res.status(404).json({message: "cannot find subscriber"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.question = question
    next()
}

module.exports = router