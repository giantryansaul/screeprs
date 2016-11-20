var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports = {
     run: function() {
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
     }
     
};