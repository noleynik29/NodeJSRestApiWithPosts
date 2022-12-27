import express from 'express'
import mongoose from 'mongoose'
import Post from './Post.js'
import router from './router.js'
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 3000
const DB_URL = 'mongodb+srv://noleynik29:pmi2wq2KUOpflSuD@cluster0.klbau4t.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

mongoose.set('strictQuery', false)

async function start() {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log('Server started on adress: ', `http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()