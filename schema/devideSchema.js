/**
 * device table schema 
 */
module.exports = (sequelize, Sequelize) => {
    const device = sequelize.define("device", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        deviceType: {
            type: Sequelize.STRING(2),
            comment: "I:i-phone ,A:android",
            defaultValue: ""
        },
        deviceToken: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        deviceId: {
            type: Sequelize.STRING(50),
            defaultValue: ""
        },
        timezone: {
            type: Sequelize.STRING(40),
            defaultValue: ""
        },
    });
    return device;
};