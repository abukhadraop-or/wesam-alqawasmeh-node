const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("user", "writer", "editor", "admin"),
      required: true,
      defaultValue: "user",
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
          writer: ["read, create"],
          editor: ["read", "create", "update"],
          admin: ["read", "create", "update", "delete"],
        };

        return acl[this.role];
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          { id: this.id, isAdmin: this.isAdmin },
          process.env.SECRET
        );
      },
      set(tokenObj) {
        const token = jwt.sign(tokenObj, process.env.SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
  });

  model.authenticateBasic = async (username, password) => {
    try {
      const user = await this.findOne({ where: { username } });
      const validate = await bcrypt.compare(password, user.password);
      if (validate) return user;

      throw new Error("Invalid User !!!");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  model.authenticateToken = async (token) => {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await this.findOne({ where: { id: parsedToken.id } });
      if (user) return user;

      throw new Error("User Not Found !!!!");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return model;
};

module.exports = userModel;
