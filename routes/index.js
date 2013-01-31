
/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', { title: 'Express' });
};

exports.upload = function(req, res) {
    var fs = require('fs'),
        crc = require('crc/lib/crc'),
        type = req.body.type,
        img = req.body.img.replace(/^data:image\/\w+;base64,/, ""),
        hash = crc.crc32(img);

    fs.writeFile('./public/images/'+hash+'.'+type, new Buffer(img, 'base64'), function(err) {
        res.json({success: true, hash: hash});
    });
};
