const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { checkEmail, checkPhone } = require('./../utils/validator')
const { generateAccessToken, generateRefreshToken, generateActivationToken } = require('./../utils/generateToken')

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

      if (password.length < 8)
        return res.status(400).json({msg: 'Password length should be at least 8 characters.'})
  
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
  },
  login: async(req, res) => {
    try {
      const {email, password} = req.body

      if (!email || !password)
        return res.status(400).json({msg: 'Please provide every field.'})

      if (!checkEmail(email))
        return res.status(400).json({msg: 'Please provide correct email.'})
      
      const user = await User.findOne({email})
      if (!user)
        return res.status(403).json({msg: 'Invalid authentication'})

      loginUser(res, password, user)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

const loginUser = async(res, password, user) => {
  const isPwMatch = await bcrypt.compare(password, user.password)
  if (!isPwMatch)
    return res.status(403).json({msg: 'Invalid authentication'})

  const accessToken = generateAccessToken({id: user._id})
  const refreshToken = generateRefreshToken({id: user._id})

  res.cookie('learnify_rfToken', refreshToken, {
    httpOnly: 'true',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth/refresh_token'
  })

  return res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    user: {
      ...user._doc,
      password: ''
    },
    accessToken
  })
}

module.exports = authCtrl