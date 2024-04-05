var express = require('express');
var router = express.Router();

const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.manyOrNone('SELECT * FROM public.user')
  .then(data => {
    res.status(200).json({
      status: 'success',
      records: data,
    })
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  console.log(req.body.name, req.ip);
  db.one('INSERT INTO public.user(name, ip) VALUES(${req.body.name}, ${req.ip}) RETURNING id', { req })
  .then((data) => {
    res.status(200).json({
      status: 'success',
      message: 'Inserted one user',
      payload: data
    })
  })
  .catch(next);
});

module.exports = router;
