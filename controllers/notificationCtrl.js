const Notification = require('./../models/Notification')

const notificationCtrl = {
  getAllNotifications: async(req, res) => {
    try {
      const notifications = await Notification.find({user: req.user._id}).populate('data.author', 'name')
      return res.status(200).json({notifications})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = notificationCtrl