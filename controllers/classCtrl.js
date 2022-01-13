const mongoose = require('mongoose')
const Class = require('./../models/Class')

const classCtrl = {
  getClassesByInstructor: async(req, res) => {
    try {
      const classes = await Class.find({instructor: req.user._id}).sort('-createdAt').populate('quizzes', '_id title status')
      return res.status(200).json({classes})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getStudentClasses: async(req, res) => {
    try {
      const classes = await Class.aggregate([
        {
          $match: {people: mongoose.Types.ObjectId(req.user._id)}
        },
        {
          $lookup: {
            "from": "users",
            "let": { user_id: "$instructor" },
            "pipeline": [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: {name: 1} }
            ],
            "as": "instructor"
          }
        },
        { $unwind: "$instructor" }
      ])

      return res.status(200).json({classes})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createClass: async(req, res) => {
    try {
      const { name, description } = req.body

      if (!name || !description)
        return res.status(400).json({msg: 'Please provide every field.'})

      const newClass = new Class({
        name, description, instructor: req.user._id
      })
      await newClass.save()

      return res.status(200).json({
        msg: `${newClass.name} class created.`,
        class: newClass
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  changeRestrictStatus: async(req, res) => {
    try {
      const { status } = req.body
      const { id } = req.params

      await Class.findOneAndUpdate({_id: id}, {restrict: status}, {new: true})

      return res.status(200).json({msg: 'Class restrict status has been changed.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  renameClass: async(req, res) => {
    try {
      const { name } = req.body
      const { id } = req.params

      if (!name)
        return res.status(400).json({msg: 'Class name can\'t be empty.'})

      const classDetail = await Class.findOneAndUpdate({_id: id}, {name}, {new: true})
      if (!classDetail)
        return res.status(404).json({msg: `Class with ID ${id} not found.`})

      return res.status(200).json({
        msg: 'Class has been updated.',
        class: classDetail
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  joinClass: async(req, res) => {
    try {
      const findUserInClass = await Class.findOne({_id: req.params.id, people: req.user._id})
      if (findUserInClass)
        return res.status(400).json({msg: 'You have join this class.'})

      const classData = await Class.findOneAndUpdate({_id: req.params.id}, {
        $push: { people: req.user._id }
      }, {new: true})

      return res.status(200).json({
        msg: 'Class joined.',
        class: classData
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = classCtrl