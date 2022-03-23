import { sequelize, DataTypes, Model } from "@ooic/core";

export class User extends Model {
  id: number;
  username: string;
  password: string;
  companyName:string;
}

User.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      login: {
        attributes: ["id", "username", "password"],
      },
    },
    tableName:"user",
    sequelize,
  }
);
