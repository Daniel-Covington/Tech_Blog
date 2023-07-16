const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.import('./User.js');
const Post = sequelize.import('./Post.js');

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Post };