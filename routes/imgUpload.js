const router = require('express').Router();
const aws = require("@aws-sdk/client-s3");


const s3 = new aws.S3({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
});

//request allowing user to upload a recipe image into aws s3 bucket
router.post('/upload', (req, res) => {
    let fileName = req.body.name + req.files.image.name.substring(req.files.image.name.lastIndexOf('.')); //recipe id + image extension
    const params = { Bucket: 'recipestore', Key: fileName, Body: req.files.image.data };
    s3.putObject(params, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        //cdn link to image
        return res.send('http://dgsa391cfwse1.cloudfront.net/' + fileName);
    })
});

module.exports = router;