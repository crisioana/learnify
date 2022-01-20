const mongoose = require('mongoose')
const Class = require('./../models/Class')
const Result = require('./../models/Result')
const Quiz = require('./../models/Quiz')

const classCtrl = {
  getClassesByInstructor: async(req, res) => {
    try {
      const classes = await Class.find({instructor: req.user._id}).sort('-createdAt').populate('quizzes', '_id title status').populate('people', 'avatar name email')
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
  getClassDetail: async(req, res) => {
    try {
      const { sort, category } = req.query

      const categoryQuery = []
      if (typeof category === 'string') {
        categoryQuery.push(mongoose.Types.ObjectId(category))
      } else {
        for (let i = 0; i < category?.length; i++) {
          categoryQuery.push(mongoose.Types.ObjectId(category[i]))
        }
      }

      const quizPipeline = [
        { $match: { $expr: { $in: ["$_id", "$$quiz_id"] } } },
        {
          $lookup: {
            "from": "results",
            "let": { result_id: "$results" },
            "pipeline": [
              { $match: { $expr: { $in: ["$_id", "$$result_id"] } } }
            ],
            "as": "results"
          }
        }
      ]

      if (categoryQuery.length !== 0) {
        quizPipeline.unshift({
          $match: {
            category: { $in: categoryQuery }
          }
        })
      }

      if (sort === 'descending') {
        quizPipeline.unshift(
          { $sort: { createdAt: -1 } }
        )
      }

      const classDetail = await Class.aggregate([
        {
          $match: {_id: mongoose.Types.ObjectId(req.params.id)}
        },
        {
          $lookup: {
            "from": "users",
            "let": { user_id: "$instructor" },
            "pipeline": [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { name: 1 } }
            ],
            "as": "instructor"
          }
        },
        { $unwind: "$instructor" },
        {
          $lookup: {
            "from": "quizzes",
            "let": { quiz_id: "$quizzes" },
            "pipeline": quizPipeline,
            "as": "quizzes"
          }
        }
      ])

      if (!classDetail)
        return res.status(404).json({msg: `Class with ID ${req.params.id} not found.`})

      return res.status(200).json({class: classDetail})
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

      const newClass = await Class.findOneAndUpdate({_id: id}, {restrict: status}, {new: true})
      return res.status(200).json({class: newClass})
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
      const classDetail = await Class.findOne({_id: req.params.id})
      if (!classDetail)
        return res.status(404).json({msg: 'Class not found.'})

      if (classDetail.restrict)
        return res.status(400).json({msg: 'This class currently don\'t accept any student.'})

      const findUserInClass = await Class.findOne({_id: req.params.id, people: req.user._id})
      if (findUserInClass)
        return res.status(400).json({msg: 'You have join this class.'})

      const classData = await Class.findOneAndUpdate({_id: req.params.id}, {
        $push: { people: req.user._id }
      }, {new: true}).populate('instructor', 'name')

      return res.status(200).json({
        msg: 'Class joined.',
        class: classData
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  kickStudent: async(req, res) => {
    try {
      const classDetail = await Class.findOneAndUpdate({_id: req.body.classId}, {
        $pull: { people: req.params.id }
      })
      if (!classDetail)
        return res.status(404).json({msg: `No class found with ID ${req.body.classId}`})

      const classQuizzes = classDetail.quizzes
      for (let i = 0; i < classQuizzes.length; i++) {
        const resultDetail = await Result.findOneAndDelete({student: req.params.id, quiz: classQuizzes[i]})
        if (resultDetail) {
          await Quiz.findOneAndUpdate({_id: classQuizzes[i]}, {
            $pull: { results: resultDetail._id }
          })
        }
      }

      return res.status(200).json({msg: `Student with ID ${req.params.id} has been kicked.`})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  deleteClass: async(req, res) => {
    try {
      const classDetail = await Class.findOneAndDelete({_id: req.params.id})
      if (!classDetail)
        return res.status(404).json({msg: `Class with ID ${req.params.id} not found.`})

      const classQuizzes = classDetail.quizzes
      for (let i = 0; i < classQuizzes.length; i++) {
        await Result.deleteMany({quiz: classQuizzes[i]})
        await Quiz.findOneAndDelete({_id: classQuizzes[i]})
      }

      return res.status(200).json({msg: `Class with ID ${req.params.id} has been deleted.`})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  searchInstructorClass: async(req, res) => {
    try {
      const classes = await Class.aggregate([
        {
          $search: {
            index: 'teacherClass',
            autocomplete: {
              "query": req.query.title,
              "path": "name"
            }
          }
        },
        {
          $lookup: {
            "from": "quizzes",
            "let": { quiz_id: "$quizzes" },
            "pipeline": [
              { $match: { $expr: { $in: ["$_id", "$$quiz_id"] } } },
              { $project: { title: 1, status: 1 } }
            ],
            "as": "quizzes"
          }
        },
        {
          $lookup: {
            "from": "users",
            "let": { user_id: "$people" },
            "pipeline": [
              { $match: { $expr: { $in: ["$_id", "$$user_id"] } } },
              { $project: { avatar: 1, name: 1, email: 1 } }
            ],
            "as": "people"
          }
        },
        { $match: { instructor: mongoose.Types.ObjectId(req.params.id) } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
      ])

      if (!classes.length)
        return res.status(404).json({msg: 'No class found.'})

      return res.status(200).json({classes})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = classCtrl