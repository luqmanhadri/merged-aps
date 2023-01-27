const express = require('express');
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

app.use("/profile", profileRouter);

db.sequelize.sync().then(()=>{

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

});

