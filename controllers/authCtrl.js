const User = require('./../models/User')
const sendMail = require('./../utils/sendMail')
const bcrypt = require('bcrypt')
const fetch = require('cross-fetch')
const jwt = require('jsonwebtoken')
const { checkEmail, checkPhone } = require('./../utils/validator')
const { generateAccessToken, generateRefreshToken, generateActivationToken } = require('./../utils/generateToken')
const { OAuth2Client, auth } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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

      const url = `${process.env.CLIENT_URL}/activate/${activationToken}`
      sendMail(email, url, 'Account Activation')
  
      return res.status(200).json({msg: 'Email activation link has been sent to your email.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  activateAccount: async(req, res) => {
    try {
      const { token } = req.body

      if (!token)
        return res.status(400).json({msg: 'Activation token is invalid.'})
  
      const user = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET)
      if (!user)
        return res.status(400).json({msg: 'Account activation data not found.'})
      
      const findRegisteredEmail = await User.findOne({email: user.email})
      if (findRegisteredEmail)
        return res.status(400).json({msg: 'Email has been registered before.'})
  
      const findRegisteredPhone = await User.findOne({phone: user.phone})
      if (findRegisteredPhone)
        return res.status(400).json({msg: 'Phone has been registered before.'})
  
      const newUser = new User(user)
      await newUser.save()
      
      return res.status(200).json({msg: 'Account activated successfully.'})
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
        return res.status(403).json({msg: 'Invalid authentication.'})

      loginUser(res, password, user)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  logout: async(req, res) => {
    try {
      res.clearCookie('learnify_rfToken', {
        path: '/api/v1/auth/refresh_token'
      })

      return res.status(200).json({msg: 'Logout success.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  refreshToken: async(req, res) => {
    try {
      const rfToken = req.cookies.learnify_rfToken
      if (!rfToken)
        return res.status(403).json({msg: 'Invalid authentication.'})

      const decoded = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET)
      if (!decoded.id)
        return res.status(403).json({msg: 'Invalid authentication.'})

      const user = await User.findById(decoded.id)
      if (!user)
        return res.status(403).json({msg: 'Invalid authentication.'})

      const accessToken = generateAccessToken({id: user._id})
      
      return res.status(200).json({
        user: {
          ...user._doc,
          password: ''
        },
        accessToken
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  updateProfile: async(req, res) => {
    try {
      const { avatar, name, phone, gender } = req.body

      if (!name)
        return res.status(400).json({msg: 'Name field can\'t be blank.'})

      if (!phone)
        return res.status(400).json({msg: 'Phone number field can\'t be empty.'})

      const newUser = await User.findOneAndUpdate({_id: req.user._id}, {
        name, avatar, phone: `+${phone}`, gender
      }, {new: true})

      return res.status(200).json({
        msg: 'User profile updated.',
        user: newUser
      })
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  changePassword: async(req, res) => {
    try {
      const { oldPassword, newPassword } = req.body
      if (!oldPassword || !newPassword)
        return res.status(400).json({msg: 'Please provide every field.'})

      if (newPassword.length < 8)
        return res.status(400).json({msg: 'New password should be at least 8 characters.'})
      
      const isPwMatch = await bcrypt.compare(oldPassword, req.user.password)
      if (!isPwMatch)
        return res.status(403).json({msg: 'Current password is incorrect.'})

      if (req.user.type !== 'register')
        return res.status(400).json({msg: `Account that login with ${req.user.type} can\'t change their password.`})

      const newPw = await bcrypt.hash(newPassword, 12)
      await User.findOneAndUpdate({_id: req.user._id}, {password: newPw})
      return res.status(200).json({msg: 'Password has been changed.'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  googleLogin: async(req, res) => {
    try {
      const { token } = req.body
      const verify = await client.verifyIdToken({idToken: token, audience: process.env.GOOGLE_CLIENT_ID})

      const { name, email, email_verified, picture } = verify.getPayload()

      if (!email_verified)
        return res.status(403).json({msg: 'Your email hasn\'t been verified yet.'})

      const password = '__--___=++=++yOOuuuURRGoooglLELEEELPaassw' + email
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await User.findOne({email})
      if (user) {
        loginUser(res, password, user)
      } else {
        const newUser = {
          name,
          email,
          password: passwordHash,
          role: 'Student',
          avatar: picture,
          type: 'google'
        }
        registerUser(newUser, res)
      }
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  facebookLogin: async(req, res) => {
    try {
      const { accessToken, userID } = req.body
      const url = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

      const data = await fetch(url)
        .then(res => res.json())
        .then(res => {return res})

      const { name, email, picture } = data

      const password = '___---__-++====yYYoooUURRrrRGFaceeBBookOKPasssswordddD' + email
      const passwordHash = await bcrypt.hash(password, 12)

      const user = await User.findOne({email})
      if (user) {
        loginUser(res, password, user)
      } else {
        const newUser = {
          name,
          email,
          password: passwordHash,
          role: 'Student',
          avatar: picture.data.url,
          type: 'facebook'
        }
        registerUser(newUser, res)
      }
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

const loginUser = async(res, password, user) => {
  const isPwMatch = await bcrypt.compare(password, user.password)

  let msg = ''
  if (user.type !== 'register')
    msg = `This user login using ${user.type} account.`
  else
    msg = 'Invalid authentication.'

  if (!isPwMatch)
    return res.status(403).json({msg})

  const accessToken = generateAccessToken({id: user._id})
  const refreshToken = generateRefreshToken({id: user._id})

  res.cookie('learnify_rfToken', refreshToken, {
    httpOnly: true,
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

const registerUser = async(newUser, res) => {
  try {
    const user = new User(newUser)
    await user.save()

    const accessToken = generateAccessToken({id: user._id})
    const refreshToken = generateRefreshToken({id: user._id})

    res.cookie('learnify_rfToken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/auth/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      msg: `Authenticated as ${user.name}`,
      user: {
        ...user._doc,
        password: ''
      },
      accessToken
    })
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

module.exports = authCtrl