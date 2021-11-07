const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./config')
const { client_id, client_secret, redirect_uri } = config
const axios = require('axios')

app.use(express.json()); //to accept req.body
app.use(cors())

app.post('/authenticate', async (req, res) => {
    try {
        const { code } = req.body

        const response = await axios.post(`https://github.com/login/oauth/access_token`, {
            'client_id': client_id, 'client_secret': client_secret,
            'code': code, 'redirect_uri': redirect_uri
        })

        if (response.status === 200) {
            const { data } = response
            return res.status(200).json({ success: false, message: 'Success', token: data })
        }
        return res.status(400).json({ success: false, message: 'Something went wrong' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))