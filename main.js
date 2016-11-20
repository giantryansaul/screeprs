var base = require('base');
var runCreeps = require('run.creeps');
var roomObj = require('rooms');

module.exports.loop = function () {
    base.workers();

    room_names = roomObj.get();
    for (var room_name in room_names) {
        console.log('available rooms:' + room_name);
        base.build_structures(room_name);
    }
    runCreeps.run();
}
