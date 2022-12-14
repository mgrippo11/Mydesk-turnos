const express = require('express');
const router = express.Router();
const {getlibres, getAll} = require('../controllers/puesto_controller');

router.get('/libres', getlibres);
router.get('/all', getAll);

module.exports = {
    routes: router,
  };