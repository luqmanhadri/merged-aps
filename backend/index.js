const express = require('express');
<<<<<<< HEAD
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const profileRouter = require('./routes/Profile');
const videoRouter = require('./routes/Video');
const inventoryRouter = require('./routes/Inventory');
const eventRouter = require('./routes/Event');
const wellnessRouter = require('./routes/Wellness');
const bookingRouter = require('./routes/Booking');
// const commentRouter = require('./routes/Comment');
const accountRouter = require('./routes/Account');
const teamRouter = require('./routes/Team');
const announcementRouter = require('./routes/Announcement');
const cookieParser = require("cookie-parser")
// const session = require("express-session")

=======
>>>>>>> 7aabed20ef40086954cfaddb68f8baa85268a5bd
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const profile = require('./models/Profile');
const inventory = require('./models/Inventory');

const db = require('./models');

//Routers
const profileRouter = require('./routes/Profile');
const inventoryRouter = require('./routes/Inventory');

<<<<<<< HEAD
app.use(cors(
  {
    // credentials: true,
    origin: 'http://localhost:3000'
}
));
app.use("/profile", profileRouter);
app.use("/videos", videoRouter);
// app.use("/comment", commentRouter);
app.use("/inventory", inventoryRouter);
app.use("/account", accountRouter);
app.use("/announcement", announcementRouter);
app.use("/event", eventRouter);
app.use("/wellness", wellnessRouter);
app.use("/booking", bookingRouter);
app.use("/team", teamRouter);
=======
app.use("/profile", profileRouter);

db.sequelize.sync().then(()=>{
>>>>>>> 7aabed20ef40086954cfaddb68f8baa85268a5bd

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

});

