import { sequelize, DataTypes, Model } from "@ooic/core";

export class Table extends Model {
  id: number;
  title: string;
  uid: string;
  ownerId:number
  /* type definitions */
}

Table.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /* field initialization */
  },
  {
    tableName: "table",
    sequelize,
  }
);
