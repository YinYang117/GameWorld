'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 60],
        isNotEmail(value) {if (Validator.isEmail(value)) throw new Error('Cannot be an email.')}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 256],
        isEmail: true
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 60]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 30]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
          // sets aside emtpy {} to fill in with our login credentials
        }
      }
    });

  // Scopes help protect sensitive user information that should not be exposed to other users, or sent to front end.
  // login scope should only be used when checking the login credentials of a user.

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email, firstname, lastname, title } = this; // context is the User instance
    return { id, username, email, firstname, lastname, title };
  };

  User.prototype.validatePassword = function (password) { // returns bool 
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) { // returns scoped 'current user' based off id
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) { // takes obj arg
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, firstname, lastname, title, password }) { // takes obj arg
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      firstname,
      lastname,
      title,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  
  User.associate = function (models) {
    User.hasMany(models.Product, { foreignKey: 'ownerId', onDelete: 'cascade', hooks: true })
    User.hasMany(models.Discussion, { foreignKey: 'userId', onDelete: 'cascade', hooks: true })
  };

  return User;
};