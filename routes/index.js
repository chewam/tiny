exports.index = function(req, res) {
    res.render('index');
};

exports.upload = function(req, res) {
    var fs = require('fs'),
        crc = require('crc/lib/crc'),
        type = req.body.type,
        img = req.body.img.replace(/^data:image\/\w+;base64,/, ""),
        hash = crc.crc32(img),
        name = hash+'.'+type,
        path = './public/images/'+name,
        buffer = new Buffer(img, 'base64');

    fs.writeFile(path, buffer, function(err) {
        res.json({success: true, img: name});
    });
};
