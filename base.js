var common = require('common');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports = {

    buildLevel: function(roomName) {
        var level = common.getRoomLevel(roomName);
        var energyLevel = this.energyLevel(roomName);

        this.buildWorkers(roomName, level, energyLevel);
        this.workerBehavior(roomName, level, energyLevel);
        this.buildStructures(roomName, level, energyLevel);
    },

    energyLevel: function(roomName) {
        var capacity = Game.rooms[roomName].energyCapacityAvailable;
        if (capacity < 350) { return 0; } //max: 200
        else if (capacity >= 350 && capacity < 450) { return 1; } // max: 300
        else if (capacity >= 450 && capacity < 600) { return 2; } // max: 400
    },

    buildWorkers: function(roomName, level, energyLevel) {
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

            if (harvesters.length < 7) {
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

    workerBehavior: function(roomName, level, energyLevel) {

        for(var name in Game.creeps) {
           var creep = Game.creeps[name];
           if(creep.memory.role == roleHarvester.name) {roleHarvester.run(creep, roomName, energyLevel);}
           if(creep.memory.role == roleUpgrader.name) {roleUpgrader.run(creep, roomName, energyLevel);}
           if(creep.memory.role == roleBuilder.name) {roleBuilder.run(creep, roomName, energyLevel);}
        }
    },

    buildStructures: function(roomName, level, energyLevel) {

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
