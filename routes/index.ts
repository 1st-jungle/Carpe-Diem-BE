// var express = require('express');
// var router = express.Router();
// // 이미지 업로드
// const multer = require('multer');
// const AWS = require('aws-sdk');
// const multerS3 = require('multer-s3');
// // const dotenv = require('dotenv');

// const s3 = new AWS.S3({
//     accessKeyId: 'AKIAZKI6VSSR4WUABAEI',
//     secretAccessKey: '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',
//     region: 'ap-northeast-2',
// });

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'carpe-diem-video-buffer',
//         key: function (req, file, cb) {
//             // var ext = file.mimetype.split('/')[1];
//             // if (!['webm', 'png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
//             //     return cb(new Error('Only images are allowed'));
//             // }
//             cb(null, Date.now() + '.' + file.originalname.split('.').pop());
//         },
//     }),
//     acl: 'public-read-write',
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// // 이미지 업로드 요청
// router.post('/upload', upload.single('file'), async (req, res) => {
//     console.log('Uploading');
//     console.log(req.file);
//     // console.log(req.file.location);
//     res.status(200).json();
// });

// /* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// module.exports = router;

const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
// const fileType = require('file-type');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accessKeyId = '';
const secretAccessKey = '';
const region = '';
const bucketName = '';
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});
// app.get("/check", (req, res) => {
//     res.json({'message': 'ok'});
// })

app.post('/upload', upload.single('file'), (req, res) => {
    // console.log(req);
    console.log(req.file);
    if (req.file == null) {
        return res.status(400).json({ message: 'Please choose the file' });
    }

    var file = req.file;
    // res.send(200);
    // res.sendStatus(201);

    const uploadImage = (file) => {
        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: fileStream,
        };

        s3.upload(params, function (err, data) {
            console.log(data);
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
    };
    uploadImage(file);
    return res.send(201);
});

// app.listen(3002);
app.listen(3002, () => {
    console.log('Server running on port 3002');
});
