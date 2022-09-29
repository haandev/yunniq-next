import { sequelize, DataTypes, Model } from "@ooic/core";

export class SmartModel extends Model {
  id: number;
  tableName: string;
  modelName: string;
  description: string;
  icon: string;
  isHierarchy: boolean;
  sortable: boolean;
}

SmartModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    tableName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    modelName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isHierarchy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sortable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
  },
  {
    tableName: "smartmodel",
    sequelize,
  }
);
SmartModel.sync({ alter: true });
