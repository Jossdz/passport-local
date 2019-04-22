const express = require('express');
const router  = express.Router();
const ensureLogin = require('connect-ensure-login')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/private-page',
  /* ejecutamos el middleware para verificar si hay un usuario en sesión*/
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render('private', { user: req.user })
  })

module.exports = router;
