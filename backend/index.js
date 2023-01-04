const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const profileRouter = require('./routes/Profile');
const videoRouter = require('./routes/Video');
const inventoryRouter = require('./routes/Inventory');
const eventRouter = require('./routes/Event');
const wellnessRouter = require('./routes/Wellness');
// const commentRouter = require('./routes/Comment');
const accountRouter = require('./routes/Account');
const announcementRouter = require('./routes/Announcement');
const cookieParser = require("cookie-parser")
// const session = require("express-session")

const app = express();
dotenv.config();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-Requested-With, Content-Type, Authorization'
//     );
//     next();
//   });

app.use(cookieParser());
app.use(express.json());

// app.use(express.static('public'));
// app.use(express.json({ limit: '10mb' }));

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        throw err;
    });
}

app.use(cors(
//   {
//     credentials: true,
//     origin: 'http://localhost:3000'
// }
));
app.use("/profile", profileRouter);
app.use("/videos", videoRouter);
// app.use("/comment", commentRouter);
app.use("/inventory", inventoryRouter);
app.use("/account", accountRouter);
app.use("/announcement", announcementRouter);
app.use("/event", eventRouter);
app.use("/wellness", wellnessRouter);




// const connect = async () => {
//     try {
//       const conn = await mongoose.connect(process.env.MONGO, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//       });
//       console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//       console.error("Cant connect");
//       process.exit();
//     }
//   };

// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: 'auto'
//     }
// }))

// const profile = require('./models/Profile');
// const inventory = require('./models/Inventory');

// const db = require('./models');


app.listen(process.env.APP_PORT, () => {
    connect()
    console.log("Server running on port 3001");
});

// db.sequelize.sync().then(()=>{

// app.listen(process.env.APP_PORT, () => {
//     connect()
//     console.log("Server running on port 3001");
// });

// });

