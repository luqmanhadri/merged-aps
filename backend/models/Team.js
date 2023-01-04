const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const TeamSchema = new mongoose.Schema({

    coach: {
        type: String,
      },

    manager: {
        type: String,
    },

    players: {
        type: [String],
        default: [],
    },

    achievements: {
        type: [Text],
        default: [],
    },

    
}, {timestamps: true});

module.exports =  mongoose.model("Team", TeamSchema)