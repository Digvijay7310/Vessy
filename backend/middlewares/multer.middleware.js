import multer from 'multer'
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Create temp path
const tempPath = path.join(__dirname, "../public/temp");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, tempPath)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    },
})


export const upload = multer({storage})