// const http = require('http');
// const app = require('./app');
// const { initializeSocket } = require('./socket');
// const port = process.env.PORT || 3000 ; 

// const server = http.createServer(app);
// initializeSocket(server);

// const express = require('express');
// const cors = require('cors');

// const app = express();

// server.listen(port , () =>{
//     console.log(`server is running on port ${port}`)     
// });


const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 4000; // ✅ FIXED

const server = http.createServer(app);

// ✅ Initialize socket
initializeSocket(server);

// ✅ Start server
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});