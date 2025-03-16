import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

// Middleware
// Bu satır, gelen JSON formatındaki isteklerin işlenmesini sağlayan bir middleware ekliyor.
app.use(express.json())

// Express html ile bağlantılı olan css dosylarının nerede olduğunu anlaması için
// Bu satır, statik dosyaların (HTML, CSS, JavaScript, resimler vb.) sunulmasını sağlayan bir middleware ekliyor. 
// '../public' dizinindeki dosyaları sunucu üzerinden erişilebilir hale getiriyor.
app.use(express.static(path.join(__dirname, '../public')))

// İstek geldiğinde, 'public' dizinindeki 'index.html' dosyasını istemciye gönderiyor.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Routes
app.use('/auth', authRoutes)
// Bu satır, '/todos' rotasına gelen isteklerin önce 'authMiddleware' middleware'inden geçmesini sağlıyor.
app.use('/todos', authMiddleware, todoRoutes)


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})