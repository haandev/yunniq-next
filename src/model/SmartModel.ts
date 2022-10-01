import { sequelize, DataTypes, Model } from "@ooic/core";

export class SmartModel extends Model {
  id: number;
  tableName: string;
  modelName: string;
  singular: string;
  plural: string;
  description: string;
  icon: string;
  isHierarchy: boolean;
  userOwnable:boolean;
  groupOwnable:boolean;
  sortable: boolean;
  paranoid: boolean;
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
    singular: {
      type: DataTypes.STRING(255),
      get(){
        return (this.getDataValue("singular") || this.getDataValue("modelName")).toLowerCase()
      },
      allowNull: true,
    },
    plural: {
      type: DataTypes.STRING(255),
      get(){
        return (this.getDataValue("plural") || this.getDataValue("tableName")).toLowerCase()
      },
      allowNull: true,
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
    userOwnable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    groupOwnable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sortable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paranoid: {
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

SmartModel.sync();
