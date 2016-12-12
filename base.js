var common = require('common');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports = {

    buildLevel: function(roomName) {
        var level = common.getRoomLevel(roomName);

        this.buildWorkers(roomName, level);
        this.workerBehavior(roomName, level);
        this.buildStructures(roomName, level);
        // TODO: Need a total energy store factor, can't build new workers right now.
    },

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
        } else if (level == 2) {

            if (harvesters.length < 5) {
                common.buildCreep(roleHarvester, roomName);
            } else if (builders.length < 3) {
                common.buildCreep(roleBuilder, roomName);
            } else if (upgraders.length < 1) {
                common.buildCreep(roleUpgrader, roomName);
            }
            if (Game.rooms[roomName].energyCapacityAvailable >= 550) {
                if (upgraders.length < 4) {
                    common.buildCreep(roleUpgrader, roomName);
                }
            }
        }
    },

    workerBehavior: function(roomName, level) {

        for(var name in Game.creeps) {
           var creep = Game.creeps[name];
           if(creep.memory.role == roleHarvester.name) {roleHarvester.run(creep);}
           if(creep.memory.role == roleUpgrader.name) {roleUpgrader.run(creep, roomName);}
           if(creep.memory.role == roleBuilder.name) {roleBuilder.run(creep, roomName);}
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
            var spawn = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0];
            Game.rooms[roomName].createConstructionSite(
                spawn.pos.x + positions[i][0],
                spawn.pos.y + positions[i][1],
                STRUCTURE_EXTENSION
            );
        }
    }
}
