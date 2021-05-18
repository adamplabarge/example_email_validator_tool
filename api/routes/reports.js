const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../mocks', 'reports.json'))
})

router.put('/', function(req, res, next) {
  const { ticketState } = req.body
  const id = req.baseUrl.split('/')[2]
  
  // validate res
  // update db
  // respond with good/bad
  
  res.send({ id: ticketState })
})

module.exports = router