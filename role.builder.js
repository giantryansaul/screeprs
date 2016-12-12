var common = require('common');

module.exports = {

    name: 'builder',

    parts: [
        [WORK, CARRY, MOVE], // 200
        [WORK, WORK, WORK, CARRY], // 300
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE] // 400
    ],

    /** @param {Creep} creep **/
    run: function(creep, roomName, energyLevel) {

        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('fetching resources');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else if (Game.rooms[roomName].energyAvailable > common.energyAvailablePerLevel[energyLevel]) {
            common.withdrawEnergyFromBase(creep);
        }
    }
};
