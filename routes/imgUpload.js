const router = require('express').Router();
const aws = require('aws-sdk');


const s3 = new aws.S3();

//request allowing user to upload a recipe image into aws s3 bucket
router.post('/upload', (req, res) => {
    let fileName = req.body.name + req.files.image.name.substring(req.files.image.name.lastIndexOf('.')); //recipe id + image extension
    const params = { Bucket: 'recipestore', Key: fileName, Body: req.files.image.data };
    s3.putObject(params, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.send('http://dgsa391cfwse1.cloudfront.net/' + fileName);
    })
});

module.exports = router;