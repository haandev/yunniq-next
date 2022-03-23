import { FindOptions } from "sequelize/types";
import { Category } from "./Category";
import { CategoryLocale } from "./CategoryLocale";
import { Login } from "./Login";
import { Product } from "./Product";
import { ProductLocale } from "./ProductLocale";
import { Slider } from "./Slider";
import { Table } from "./Table";
import { User } from "./User";

const pagerScopeFactory = (params) => {
  const { pageIndex, pageSize } = params;
  return {
    offset: pageIndex * pageSize,
    limit: pageSize,
  };
};
const localeScopeFactory = (locale) => ({
  include: [
    {
      association: "locales",
      ...(locale ? { where: { locale } } : {}),
      required: false,
    },
  ],
});
const byOwnerScopeFactory = (userId: number) => ({
  where: { ownerId: userId },
});

Login.belongsTo(User, { foreignKey: "userId" });

Category.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
Category.hasMany(Category, {
  as: "subCategories",
  foreignKey: "parentCategoryId",
});
Category.hasMany(Product, {
  as: "products",
  foreignKey: "categoryId",
  constraints: false,
});
Category.hasMany(CategoryLocale, { as: "locales", foreignKey: "categoryId" });
CategoryLocale.belongsTo(Category, {
  as: "category",
  foreignKey: "categoryId",
});
CategoryLocale.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

Product.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
Product.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
Product.hasMany(ProductLocale, { as: "locales", foreignKey: "productId" });
ProductLocale.belongsTo(Product, { as: "product", foreignKey: "productId" });
ProductLocale.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

Slider.belongsTo(Product, { as: "product", foreignKey: "productId" });
Slider.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
Table.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

Category.addScope("ordered",{ order: [["order", "asc"]] });

Category.addScope("pager", pagerScopeFactory);

Category.addScope("byOwner", byOwnerScopeFactory);

Category.addScope("locale", localeScopeFactory);

Product.addScope("ordered", { order: [["order", "asc"]] });

Product.addScope("pager", pagerScopeFactory);

Product.addScope("locale", localeScopeFactory);

Product.addScope("byOwner", byOwnerScopeFactory);

CategoryLocale.addScope("byOwner", byOwnerScopeFactory);

ProductLocale.addScope("byOwner", byOwnerScopeFactory);

Table.addScope("byOwner", byOwnerScopeFactory);
