var base = require('base');
var runCreeps = require('run.creeps');
var roomObj = require('rooms');

module.exports.loop = function () {
    base.workers();

    room_names = roomObj.get();
    for (var i = 0; i < room_names.length; i++) {
        base.build_structures(room_names[i]);
    }
    runCreeps.run();
}
