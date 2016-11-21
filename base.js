var common = require('common');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports = {

    buildWorkers: function(roomName) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roleHarvester.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roleBuilder.name);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roleUpgrader.name);

        if (harvesters.length < 2) {
            common.buildCreep(roleHarvester, roomName);
        }

        if (builders.length < 1) {
            common.buildCreep(roleBuilder, roomName);
        }

        if (upgraders.length < 2) {
            common.buildCreep(roleUpgrader, roomName);
        }
    }

    workerBehavior: function(roomName) {

        for(var name in Game.creeps) {
           var creep = Game.creeps[name];
           if(creep.memory.role == roleHarvester.name) {
               roleHarvester.run(creep);
           }
           if(creep.memory.role == roleBuilder.name) {
               roleBuilder.run(creep);
           }
           if(creep.memory.role == roleUpgrader.name) {
               roleUpgrader.run(creep);
           }
       }
    },

    buildStructures: function(roomName) {

        positions = [
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
