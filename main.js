var base = require('base');
var runCreeps = require('run.creeps');
var rooms = require('rooms');

base.workers();
for (room in rooms) {
    base.build_structures(room);
}
runCreeps.run();
