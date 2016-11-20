module.exports = {

    var my_spawns = Object.keys(Game.spawns);
    var my_rooms = [];
    for (spawn in my_spawns) {
        my_rooms.push(spawn.room.name);
    }
    return [...new Set(my_rooms)];
    
}
