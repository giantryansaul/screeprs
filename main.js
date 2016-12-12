var base = require('base');
var common = require('common');

module.exports.loop = function () {

    var rooms = common.getRooms();
    for (var i = 0; i < rooms.length; i++) {
        base.buildLevel(rooms[i]);
    }
};
