const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	 var username = socket.handshake.query.username;
	// console.log(`New user connected ${username}`);
	// React

	socket.broadcast.emit('receiveMessage', {
		message: generateMessage('Admin',`${username} joined the chat.`)
	});

	socket.on('disconnect', () => {
		// console.log(`user was disconnected ${username}`);
		socket.broadcast.emit('receiveMessage', {
			message: generateMessage('Admin',`${username} disconnected from chat.`)
		});
	});

	socket.on('sendMessage', (message, callback) => {
		// console.log('sendMessage', message);
		socket.broadcast.emit('receiveMessage', {
			message: generateMessage(message.from,message.text)
		});
		callback();
	});

	socket.emit('receiveMessage', {
		message: generateMessage('Admin',`Welcome to the Chat app`)
	});

});

app.use(express.static(publicPath));


server.listen(port, () => {
	console.log(`Server is up in port ${port}`);
});