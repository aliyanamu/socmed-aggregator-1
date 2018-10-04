const express = require('express'),
      router = express.Router(),
      { list, create, listrepo, unstar, friend } = require('../controllers/index'),
      { googleSignUp } = require('../controllers/users'),
      { googleAuth, isLogin } = require('../middlewares/auth');

/* GET home page. */
router
    .get('/starred/:username', list)

    .post('/repo', isLogin, create)

    .get('/repos/:username/:reponame', listrepo)

    .get('/unstar/:username/:reponame', isLogin, unstar)

    .get('/:org', isLogin, friend)

    .post('/google-signin',googleAuth, googleSignUp)

module.exports = router;