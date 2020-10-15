const LoadFile = require('./LodaFile');

module.exports = {
    "index": function (req, res, callBack) {        
        LoadFile.loadFile('./Views/index.html', req, res, callBack);
    },
    "main": function (req, res, callBack) {
        LoadFile.loadFile('./Views/main.html', req, res, callBack);
    },
    "img": function (req, res) {
        LoadFile.loadImg('./Imgs/Annotation 2020-08-18 134158.png', req, res);
    }
}