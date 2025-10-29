const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth.verifyToken, function(req, res, next) {
  res.json("Status: Se pá que a API está funcionando em...");
});

module.exports = router;
