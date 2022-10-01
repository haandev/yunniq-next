import { sequelize, DataTypes, Model } from "@ooic/core";

export class SmartRelation extends Model {
  id: number;
  sourceModelId: number;
  isSourceMany: boolean;
  targetModelId: number;
  isTargetMany: boolean;
  pivotSmartModelTableName: string;
  pivotSmartModelName: string;
  targetAccessor?: string;
  sourceAccessor?: string;
  /* type definitions */
}

SmartRelation.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    isSourceMany: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isTargetMany: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    pivotSmartModelTableName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pivotSmartModelName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    targetAccessor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sourceAccessor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /* field initialization */
  },

  {
    tableName: "smartrelation",
    sequelize,
  }
);
SmartRelation.sync();
