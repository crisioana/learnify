const Class = require('./../models/Class')

const classCtrl = {
  getClassesByInstructor: async(req, res) => {
    try {
      const classes = await Class.find({instructor: req.user._id}).sort('-createdAt')
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
  }
}

module.exports = classCtrl