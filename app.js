const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
	socket.on('hihi', (nickname, room) => {
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
		console.log('익명의 사용자가 접속을 끊었습니다.');
	})
})


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
	console.log('run Server at http://localhost:3000/');
});
