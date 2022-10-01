import { NativeOptionsType, SmartOptionsType } from "@/smart.types";
import { sequelize, DataTypes, Model } from "@ooic/core";

export class SmartField extends Model {
  id: number;
  name: string;
  title: string
  description: string;
  icon: string;
  smartOptions : SmartOptionsType
}

SmartField.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    smartOptions: {
      type: DataTypes.JSON,
      allowNull:false
  },
    
  },
  {
    tableName: "smartfield",
    sequelize,
  }
);
SmartField.sync()