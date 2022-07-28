const multer = require('multer')
const path = require('path')

//local
// const fileStorageEngine = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./images/profile");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({ storage: fileStorageEngine })
// app.post('/single', upload.single("image"), (req, res) => {
//     console.log(req.file)
//     res.send('Profile picture upload success');
// });

//online
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});