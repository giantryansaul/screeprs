module.exports = {
    energyAvailablePerLevel: [
        200,
        300,
        400
    ],

    getSpawns: function() {
        var spawns = Game.spawns;
        var mySpawns = [];
        for (var spawn in spawns) {
            mySpawns.push(spawn);
        }
        return mySpawns;
    },

    getRooms: function() {
        var spawns = this.getSpawns();
        var myRooms = [];
        for (i = 0; i < spawns.length; i++) {
            myRooms.push(Game.spawns[spawns[i]].room.name);
        }
        return myRooms;
    },

    getRoomLevel: function(roomName) {
        return Game.rooms[roomName].controller.level;
    },

    withdrawEnergyFromBase: function(creep) {
         var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.energy;
                }
            });
            if (targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
     },

     buildCreep: function(role, roomName, energyLevel) {
         // Should later come back and make a recursive method to try building
         // at each spawn until an available one is found.
         var spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
         spawns[0].createCreep(
             role.parts[energyLevel], undefined, {role: role.name}
         );
     }
};
