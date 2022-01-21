const Notification = require('./../models/Notification')

const notificationCtrl = {
  getAllNotifications: async(req, res) => {
    try {
      const notifications = await Notification.find({user: req.user._id}).populate('data.author', 'name')
      return res.status(200).json({notifications})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createNotification: async(req, res) => {
    try {
      const { to, title, description, author, link } = req.body

      for (let i = 0; i < to.length; i++) {
        await Notification.findOneAndUpdate({user: to[i]}, {
          $push: { data: { title, description, author, link } }
        })
      }

      return res.status(200).json({msg: 'Notification has been created.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = notificationCtrl