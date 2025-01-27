const express = require('express');
const { createLinkToken,exchangePublicToken } = require('../controllers/plaidController');

const router = express.Router();


router.post('/create-link-token', createLinkToken);
router.post('/exchange-public-token',exchangePublicToken);


module.exports = router;




