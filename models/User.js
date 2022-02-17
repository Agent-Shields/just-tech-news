const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE

        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Prim Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username col
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email col
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cant be any dup email values in this table
            unique: true,
            // if allowNull set false, we can run data through validation
            validate: {
                isEmail: true
            },
            // define a pw col
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    // this means pw must be at least 4 char long
                    len: [4]
                }
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequelize connection (the direct connection to our db)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of db table
        freezeTableName: true,
        // use underscores instead of camel-casing 
        underscored: true,
        // make it so our model name stays lowercase in the db
        modelName: 'user'
    }
);
module.exports = User;