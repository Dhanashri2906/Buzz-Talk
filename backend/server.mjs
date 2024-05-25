import express from "express";
const {connectDB }= require("./config/db");
const {dotenv} = require(".env");
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import MessageRoutes from "./routes/messageRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";


config();

connectDB();
const app = express();

app.use(json()); // to accept Json Data

//Creating API using Express Js
//app.get("/a",(req,res)=> {
//    res.send("API is Running");
//}) ;

app.get("/api/user",userRoutes );
app.get("/api/chat",chatRoutes );
app.get("/api/message",MessageRoutes );

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`.yellow.bold)
  );

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });

  io.on("connection", (socket)=>{
    console.log("Connected to socket.io");
   
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("Connected");
    });
    
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

});
