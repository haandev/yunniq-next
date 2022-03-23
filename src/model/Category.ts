import { sequelize, DataTypes, Model } from "@ooic/core";
import { CategoryLocale } from "./CategoryLocale";
import { Product } from "./Product";

export class Category extends Model {
  id: number;
  locales: Array<CategoryLocale>;
  order: number;
  title: string;
  image: string;
  className: string;
  /* type definitions */
}

Category.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    className: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    /* field initialization */
  },
  {
    tableName: "category",
    sequelize,
  }
);