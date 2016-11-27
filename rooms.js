module.exports = {

    getRooms: function() {
        var my_rooms = [];
        for (spawn in Game.spawns) {
            my_rooms.push(Game.spawns[spawn].room.name);
        }
        return my_rooms;
    }

}
