const express = require('express');

const router = express.Router();
const fs = require('fs');

const constant = require('../constants/constants');

fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js' || file.indexOf('.js') === constant.INDEX_NOT_FOUND) return;
  const name = file.replace(/\.js$/, constant.Delimeters.EMPTY);
  if (name) {
    router.use('/', require(`./${name}`));
  }
});

module.exports = router;
