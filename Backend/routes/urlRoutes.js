const express = require('express');
const router = express.Router();
const {
  shortenURL,
  redirectToOriginal,
  getAnalytics
} = require('../controllers/urlController');

router.post('/api/shorten', shortenURL);
router.get('/api/analytics/:code', getAnalytics);
router.get('/:code', redirectToOriginal);

module.exports = router;
