var io = require('socket.io')(3000);

io.on('connection', function(socket){

    socket.on('join:vertical', function(data){
        var vertical_name = data.vertical_name;
        socket.join(vertical_name);
    });


    socket.on('leave:vertical', function(msg){
        msg.text = msg.user + " has left";
        socket.in(msg.vertical).emit('exit', msg);
        socket.leave(msg.vertical);
    });


    socket.on('send:message', function(msg){
        socket.in(msg.vertical).emit('message', msg);
    });

});