import { Language } from "@/enum";
import { sequelize, DataTypes, Model } from "@ooic/core";

export class ProductLocale extends Model {
  id: number;
  allergens: string;
  description: string;
  productId: number;
  locale: Language;
  title: string;
  ownerId:number
  /* type definitions */
}

ProductLocale.init(
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
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /* field initialization */
  },
  {
    tableName: "productLocale",
    sequelize,
  }
);