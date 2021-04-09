const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	socket.on('hihi', (nickname, room) => {
		socketDic[socket.id] = [room, nickname];
		console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`)
		comeOn = `${nickname}님이 입장했습니다.`
		socket.broadcast.emit("comeOn"+room, comeOn)
	})

	socket.on('send', (room, nickname, message) => {
		let data = [nickname, message]
		console.log(room, data)
		socket.broadcast.emit(room, data)
	});

	socket.on('disconnect', () => {
	})
})


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
	console.log('run Server at http://localhost:3000/');
});
