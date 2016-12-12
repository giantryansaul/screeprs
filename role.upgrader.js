var common = require('common');

module.exports = {

    name: 'upgrader',

    parts: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE],
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
    ],

    parts: function(roomName) {
        var capacity = Game.rooms[roomName].energyCapacityAvailable;
        if (capacity < 500) { return [WORK, CARRY, MOVE]; }
        else if (capacity >= 500 && capacity < 600) { return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]; }
    }

    /** @param {Creep} creep **/
    run: function(creep, roomName, energyLevel) {

        if (Game.rooms[roomName].energyAvailable > 250) {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('fetching resources');
            }
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else if (Game.rooms[roomName].energyAvailable > common.energyAvailablePerLevel[energyLevel]) {
            common.withdrawEnergyFromBase(creep);
        }
    }
};
