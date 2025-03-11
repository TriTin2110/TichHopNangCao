import express from 'express'
let app = express()
app.use(express.json())
app.post("", (req, res) => { 
        let username = req.body.username
        let password = req.body.password
        console.log('Username: ' + username)
        console.log('Password: ' + password)
        res.send('Post: Sign In')
})


export default app