const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

const config = require('../src/config.js');
const logger = require('../src/logger.js').getLogger('/');

const score = require('./score.js');
const game = require('./game.js');

const router = express.Router();

// added to develop frontend separately
if (process.env.NODE_ENV !== 'production') {
  router.use(cors())
}

router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.send({ ok: true });
});

router.use('/game', game);
router.use('/score', score);

router.all('*', function(req, res) {
  res.status(404).send({ ok: false, message: 'not found'});
});

module.exports = router;
