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
  }
}

module.exports = classCtrl