const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { checkEmail, checkPhone } = require('./../utils/validator')
const { generateActivationToken } = require('./../utils/generateToken')

const authCtrl = {
  register: async(req, res) => {
    try {
      const {name, email, phone, password, role} = req.body
      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !role
      )
        return res.status(400).json({msg: 'Please provide every field.'})
  
      if (!checkEmail(email))
        return res.status(400).json({msg: 'Please provide correct email.'})
  
      if (!checkPhone(phone))
        return res.status(400).json({msg: 'Phone number should start with + sign.'})
  
      const findRegisteredEmail = await User.findOne({email})
      if (findRegisteredEmail)
        return res.status(400).json({msg: 'Email has been registered before.'})
  
      const findRegisteredPhone = await User.findOne({phone})
      if (findRegisteredPhone)
        return res.status(400).json({msg: 'Phone has been registered before.'})
      
      const passwordHash = await bcrypt.hash(password, 12)
  
      const newUser = {
        name,
        email,
        phone,
        password: passwordHash,
        role
      }
  
      const activationToken = generateActivationToken(newUser)
  
      return res.status(200).json({msg: 'Email activation link has been sent to your email.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = authCtrl