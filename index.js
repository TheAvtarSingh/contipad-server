const express = require('express');
const dotenv = require('dotenv');
const UserRouter = require('./Routes/Users');
const connectdb = require('./Database/db');
const http = require('http');
const socketio = require('socket.io');
const PadRoutes = require('./Routes/Pads');
const cors = require('cors');
// app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const users = [{}];

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}));
dotenv.config();
app.use(cors());

connectdb();

// Socket.io
io.on('connection', (socket) => {
    console.log("New Connection");

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log("User Joined", user);

        socket.emit('welcome', { user: "admin", message: `Welcome ${user}` });
        socket.broadcast.emit('userJoined', { user: "admin", message: `${users[socket.id]} Joined the Pad` });
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected", users[socket.id]);
        socket.broadcast.emit('userLeft', { user: "admin", message: `${users[socket.id]} Left the Pad` });
        
    });

    // ... other event listeners ...

    // socket.on('contentChange',(data)=>{
    //     console.log(data);
    //     socket.broadcast.emit('contentChange',data);
    // });

});

// Routes
app.get('/',(req,res)=>{
    res.send("Server Running");
});

app.use('/api',UserRouter);
// Pads
app.use('/api',PadRoutes);

// Server
const PORT = process.env.PORT || 5001;
server.listen(PORT,()=>{console.log("Server Started At Port : ",PORT);})