module.exports = {
    
    spawn = Object.keys(Game.spawns)[0];

    init: function() {

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.crrps, (creep) => creep.memory.role == 'upgrader');
        
        if harvesters.length < 2) {
            build_harvesters();
        }
    }

    build_harvester: function() {
        Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
    }

    build_upgrader: function() {
        Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
    }
}
