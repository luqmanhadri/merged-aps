module.exports = (sequelize, DataTypes) => {

    const Inventory = sequelize.define("Inventory", {

        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        item_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        
    })

    return Inventory;
} 