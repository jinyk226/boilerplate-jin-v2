const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.send('test')
})

module.exports = router