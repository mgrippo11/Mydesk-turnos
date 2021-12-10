const express = require('express');
const router = express.Router();
const {login, viewLogin} = require('../controllers/auth_controller');
const guestMiddleware = require('../middleware/guestMiddleware');

router.get('/',  viewLogin);
router.post('/auth', login);

module.exports = {
    routes: router
}