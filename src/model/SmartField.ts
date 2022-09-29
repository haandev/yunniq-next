import { NativeOptionsType, SmartFieldTypeProp, SmartOptionsType } from "@/smart.types";
import { sequelize, DataTypes, Model } from "@ooic/core";

export class SmartField extends Model {
  id: number;
  type: SmartFieldTypeProp
  name: string;
  description: string;
  icon: string;
  nativeOptions : NativeOptionsType
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
    type: {
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
    nativeOptions: {
        type: DataTypes.JSON,
        allowNull:false
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
