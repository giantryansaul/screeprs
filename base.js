var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var build = require('build_creepers');

module.exports = {
    
    init: function() {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.crrps, (creep) => creep.memory.role == 'builder');
        
        if harvesters.length < 2) {
            build.build(roleHarvester);
        }

        if builders < 1) {
            build.build(roleBuilder);
        }
    }
}
