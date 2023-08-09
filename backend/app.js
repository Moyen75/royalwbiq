if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIO = require('socket.io');

const { handleSocketConnection } = require('./services/socketHandler');
const { authenticate } = require('./middleware/socket');

const app = express();
global.app = app;

app.set("superSecret", "sadisadas7324hkjbnsmxcbzjhcsahjk");

app.use(express.json({ limit: '50mb' }));

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      console.log(origin);
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg = `The CORS policy for ${origin} does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// require("./middleware")(app);

app.use("/api", require("./api/status"));
app.use("/api", require("./api/person"));

const port = process.env.PORT || 3001;

// Create an HTTP server and attach Express and Socket.IO to it
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

io.use(async (socket, next) => await authenticate(socket, next));
// Handle Socket.IO connections
io.on('connection', handleSocketConnection);

// Listen with the server object instead of the app object
server.listen(port, () => {
  console.log("Server started at port : ", port);
});
