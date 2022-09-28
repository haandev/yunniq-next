import { sequelize, DataTypes, HierarchicalModel } from "@ooic/core";
import { CategoryLocale } from "./CategoryLocale";
import { Product } from "./Product";

/* export class LocalizedModel extends Model {
  static isLocalized: boolean = false;
  static localesArrayKey: string
  static localeShortCodeKey :string
   initLocalization(options:{
    
  }) 
} */

export class Category extends HierarchicalModel {
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

Category.initHierarchy();
