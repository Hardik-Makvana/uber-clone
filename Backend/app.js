const dotenv = require('dotenv');
dotenv.config();

const express  = require('express');
const cors = require('cors')
const app = express(); 
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes');

connectToDb();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://uber-clone-ebon.vercel.app"  ,
//   'https://qf71bj22-5173.inc1.devtunnels.ms',
// ];

// app.use(cors({
//   origin: function(origin, callback){
//     if(!origin || allowedOrigins.includes(origin)){
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://uber-clone-ebon.vercel.app",
  "https://uber-clone-9jmtx5jxx-hardik-makvanas-projects.vercel.app", // ✅ ADD THIS
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.devtunnels.ms')
    ) {
      return callback(null, true);
    }

    return callback(null, false); // ❌ don't throw error
  },
  credentials: true
}));

// app.options('/*', cors()); // ✅ fix

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.get('/' , (req , res ) =>{
    res.send("Hello World :")
});

app.use('/users' , userRoutes);
app.use('/captains' , captainRoutes);
app.use('/maps' , mapsRoutes)
app.use('/rides' , rideRoutes) 


module.exports = app ;