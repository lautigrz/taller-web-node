import multer from 'multer';
import path from 'path';

const publicPath = path.join(process.cwd(), 'public');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     
        const dir = path.join(publicPath);
         cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });
