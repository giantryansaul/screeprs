module.exports = {
    
    build: function(role) {
        spawn = Object.keys(Game.spawns)[0];
        Game.spawns[spawn].createCreep(role.parts[0], undefined, {role: role.name});
    }
}
