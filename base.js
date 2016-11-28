var common = require('common');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports = {

    buildLevel: function(roomName) {
        var level = common.getRoomLevel(roomName);

        buildWorkers(roomName, level);
        workerBehavior(roomName, level);
        buildStructures(roomName, level);
    }

    buildWorkers: function(roomName, level) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roleHarvester.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roleBuilder.name);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roleUpgrader.name);

        if (level == 1) {
            if (harvesters.length < 3) {
                common.buildCreep(roleHarvester, roomName);
            } else if (upgraders.length < 2) {
                common.buildCreep(roleUpgrader, roomName);
            }
        } else if (level == 2){
            for (var h; h < upgraders.length; h++) {
                console.log(upgraders[h]); // FIXME
                Game.creeps[upgraders[h].name].suicide();
            }
            if (harvesters.length < 3) {
                common.buildCreep(roleHarvester, roomName);
            } else if (builders.length < 3) {
                common.buildCreep(roleBuilder, roomName);
            }
        }
    },

    workerBehavior: function(roomName, level) {

        for(var name in Game.creeps) {
           var creep = Game.creeps[name];

           if (level == 1) {
               if(creep.memory.role == roleHarvester.name) {
                   roleHarvester.run(creep);
               }
               if(creep.memory.role == roleUpgrader.name) {
                   roleUpgrader.run(creep);
               }
           } else if (level == 2) {
               if(creep.memory.role == roleBuilder.name) {
                   roleBuilder.run(creep);
               }
               if(creep.memory.role == roleHarvester.name) {
                   roleHarvester.run(creep);
               }
           }
       }
    },

    buildStructures: function(roomName, level) {

        var positions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0],
            [2, 2]
        ]

        for (var i=0; i < positions.length; i++) {
            Game.rooms[roomName].createConstructionSite(
                Game.spawns.Spawn1.pos.x + positions[i][0],
                Game.spawns.Spawn1.pos.y + positions[i][1],
                STRUCTURE_EXTENSION
            );
        }
    }
}
