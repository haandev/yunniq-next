import { sequelize, DataTypes, Model } from "@ooic/core";

export class Slider extends Model {
  id: number;
  productId: number;
  image: string;
  ownerId: number;
  order: number;
  /* type definitions */
}

Slider.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    /* field initialization */
  },
  {
    tableName: "slider",
    sequelize,
  }
);
