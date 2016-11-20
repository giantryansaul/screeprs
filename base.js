var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var build_creeps = require('build_creeps');

module.exports = {
    
    init: function() {
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == roleHarvester.name);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == roleBuilder.name);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == roleUpgrader.name);
        
        if (harvesters.length < 2) {
            build_creeps.build(roleHarvester);
        }

        if (builders.length < 0) {
            build_creeps.build(roleBuilder);
        }
        
        if (upgraders.length < 2) {
            build_creeps.build(roleUpgrader);
        }
    }
}
