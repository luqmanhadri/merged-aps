module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        age: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        height: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        sport: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Profile.associate = (models) => {
        Profile.hasMany(models.Inventory)
    }

    return Profile;
} 