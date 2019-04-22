const { Router } = require('express')
const bcrypt = require('bcrypt')
const authRouter = Router()
const passport = require('passport')
const User = require('../models/User')

authRouter.get('/signup', (req, res) => {
  res.render('auth/signup')
})

authRouter.post('/signup', async (req, res) => {
  const {username, password /*bebeciiitaaaa*/ } = req.body

  if(username === '' || password === ''){
    return res.render('auth/signup', { 
      message: "Indicate username and password"
    })
  }

  const user = await User.findOne({ username })
  if(user !== null){
    return res.render('auth/signup', {
      message: "The username already exist"
    })
  }

  //generamos el salt, que nos ayuda a hashear la contraseña 10 veces
  const salt = bcrypt.genSaltSync(10)
  // tomamos el password y lo hasheamos en función del salt
  const hashPass = bcrypt.hashSync(password, salt)

  const newUser = new User({
    username,
    password: hashPass //asliduhflqwieulqwioueyrw4uhgxser56
  })

  console.log({username, password: hashPass})

  try {
    // solamente espero a que se guarde el usuario y continuo con mi proceso
    await newUser.save()
     res.redirect('/')
  } catch(error) {
    res.render("auth/signup", {
      message: "Something went wrong"
    })
  }
})

authRouter.get('/login', (req, res) => {
  res.render('auth/login', { "message": req.flash("error") })
})



// utilizamos passport como middleware y su estrategia local
authRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRouter