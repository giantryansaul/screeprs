var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var build_creeps = require('build_creeps');

module.exports = {

    workers: function() {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roleHarvester.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roleBuilder.name);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roleUpgrader.name);

        if (harvesters.length < 2) {
            build_creeps.build(roleHarvester);
        }

        if (builders.length < 1) {
            build_creeps.build(roleBuilder);
        }

        if (upgraders.length < 2) {
            build_creeps.build(roleUpgrader);
        }
    },

    build_structures: function(room_name) {

        positions = [
            [0, 2],
            [2, 0],
            [0, -2],
            [-2, 0]
        ]

        for (position in positions) {

            Game.rooms[room_name].createConstructionSite(
                Game.spawns.Spawn1.pos.x + position[0],
                Game.spawns.Spawn1.pos.y + position[1],
                STRUCTURE_EXTENSION
            )
        }
    }
}
