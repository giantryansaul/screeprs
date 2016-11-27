module.exports = {
    getSpawns: function() {
        var mySpawns = [];
        for (spawn in Game.spawns) {
            mySpawns.push(spawn.name);
        }
        return mySpawns;
    },

    getRooms: function() {
        var myRooms = [];
        for (var i = 0; i < Game.spawns; i++) {
            myRooms.push(Game.spawns[i].room.name);
        }
        return myRooms;
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

     buildCreep: function(role, roomName) {
         // Should later come back and make a recursive method to try building
         // at each spawn until an available one is found.
         spawns = Game.rooms[roomName].find(FIND_MY_STRUCTURES,
             { filter: { structureType: STRUCTURE_SPAWN } }
         );
         // just specifying Spawn1 until I figure this part out.
         Game.spawns['Spawn1'].createCreep(
             role.parts[0], undefined, {role: role.name}
         );
     }
};
