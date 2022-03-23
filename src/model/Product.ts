import { sequelize, DataTypes, Model } from "@ooic/core";
import { ProductLocale } from "./ProductLocale";

export class Product extends Model {
  id: number;
  allergens: string;
  categoryId: number;
  description: string;
  image: string;
  locales: Array<ProductLocale>
  title: string;
  price: string;
  order: number;
  className: string;
  ownerId:number
  /* type definitions */
}

Product.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    allergens: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    className: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    /* field initialization */
  },
  {
    tableName: "product",
    sequelize,
  }
);
