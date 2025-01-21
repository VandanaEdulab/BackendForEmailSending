const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        'Book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
    },
        {
            sequelize,
            tableName: 'Book',
            timestamps: true,
            createdAt: "created_at", // alias createdAt as created_at
            updatedAt: "updated_at",
        }
    );
    return Book;
};