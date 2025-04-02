// 1. import express and get Router object
const express = require('express')
const router = express.Router()

// 3. create a fetch
const fetch = (...args)=> import('node-fetch').then(({ default: fetch})=> fetch(...args))

// 4. create port
const PORT = process.env.PORT || 3000

// 5 use public folder folder; gives access to public directory
router.use(express.static('public'))

// 6. Create our pages

// home page
router.get('/home', (req, res)=> {
    // .render(path => where we are rendering, obj => what we are rendering)
    res.render('pages/home', {
        title: 'My hero Home Page',
        name: "Christopher's Hero DB Page"
    })
})

router.get('/heroes', (req, res)=> {

})

// Error page
router.get('*', (req, res)=> {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.send('<h1>404 Error</h1>')
    }
})

// 2. Export router
module.exports = router