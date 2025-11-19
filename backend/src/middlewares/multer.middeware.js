import multer from 'multer'
import path from 'path'

const tempDir = path.join(process.cwd(), "src", "public", "temp")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, tempDir)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})
export default upload;