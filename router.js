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

router.get('/hero', (req, res)=> {
    const url = `http://localhost:${PORT}/api/hero`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/hero', {
                title: 'All Heroes',
                name: 'All Heroes',
                data
            })
        })
})

// single pages
router.get('/hero/:id', (req, res)=> {
    const id = req.params.id
    let count

    const url = `http://localhost:${PORT}/api/hero/${id}`

    const url2 = `http://localhost:${PORT}/api/hero/`

    fetch(url2)
        .then(res => res.json())
        .then(data => count = data.length)

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const heroName = data.hero_name != null ? data.hero_name : `${data.first_name} ${data.last_name}`
            res.render('pages/heroSingle', {
        title: heroName,
        name: heroName,
        data,
        count
    })
    })
})

// Error page
// router.get('*', (req, res)=> {
//     if (req.url == '/favicon.ico/') {
//         res.end()
//     } else {
//         res.send('<h1>404 Error</h1>')
//     }
// })

// 2. Export router
module.exports = router