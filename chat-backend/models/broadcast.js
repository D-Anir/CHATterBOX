'use strict';

const config = require('../config/app')

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Broadcast extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'fromUserId' })
        }
    };
    Broadcast.init({
        type: DataTypes.STRING,
        message: {
            type: DataTypes.TEXT,
            get() {
                const type = this.getDataValue('type')
                const content = this.getDataValue('message')

                return type === 'text' ? content : ''
            }
        },
        fromUserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Broadcast',
    });
    return Broadcast;
};