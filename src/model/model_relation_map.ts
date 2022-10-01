
import { SmartField } from "./SmartField";
import { SmartModel } from "./SmartModel";

import { User } from "./User";
import { SmartRelation } from "./SmartRelation";
import { Login } from "./Login";

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


SmartField.belongsTo(SmartModel, { as: "model", foreignKey: "modelId" });

SmartRelation.belongsTo(SmartModel, {as: "sourceModel", foreignKey:"sourceModelId"})
SmartRelation.belongsTo(SmartModel, {as: "targetModel", foreignKey:"targetModelId"})