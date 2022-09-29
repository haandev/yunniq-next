import { DataTypes, sequelize } from "@ooic/core";
import { SmartModels } from "./app";
import { SmartField } from "./model/SmartField";
import { SmartModel } from "./model/SmartModel";
import { SmartFieldType } from "./smart.types";

const smartPrefix = process.env.DYNAMIC_PREFIX;

export const initSmartModels = async () =>
  Promise.allSettled((await SmartModel.findAll()).map(initSmartModel));

export const initSmartModel = async (model: SmartModel) => {
  const modelName = model.modelName;
  console.log(
    `\nSmart model \x1B[42m${modelName}\x1b[0m found. Attempting to create on the fly.`
  );
  const smartFields = await SmartField.findAll({
    where: {
      modelId: model.id,
    },
  });
  const patchAttributes = await initSmartFields(smartFields);
  /**
   * Attributes initializing here
   */
  const attributes = {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    ...patchAttributes,
  };
  if (model.sortable) {
    attributes[smartPrefix + "order"] = {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    };
  }
  SmartModels[modelName] = sequelize.define(model.modelName, attributes, {
    tableName: smartPrefix + model.tableName,
  });
  const ModelSelf = SmartModels[modelName];

  await SmartModels[modelName].sync({ alter: true });

  console.log(
    `\x1B[42m${modelName}\x1b[0m is successful synced with db. Looking for localizations.`
  );
  /** Check if there is at least one localized field */
  const localizedSmartFields = smartFields.filter(
    (field) => field.getDataValue("smartOptions").isLocalize === true
  );

  if (localizedSmartFields.length) {
    console.log(
      `Localization fields found for \x1B[42m${modelName}\x1b[0m, Localization model \x1B[43m${modelName}Locale\x1b[0m is being created with table name \x1B[42m${model.tableName}_locale\x1b[0m if not exists.`
    );
    const localizedPatchAttributes = await initSmartFields(
      localizedSmartFields
    );
    SmartModels[modelName + "Locale"] = sequelize.define(
      model.modelName + "Locale",
      localizedPatchAttributes,
      {
        tableName: smartPrefix + model.tableName + "_locale",
      }
    );
    const ModelLocale = SmartModels[modelName + "Locale"];
    ModelSelf.hasMany(ModelLocale, { as: "locales", foreignKey: "originalId" });
    ModelLocale.belongsTo(ModelSelf, {
      as: "original",
      foreignKey: "originalId",
    });
    ModelLocale.sync({ alter: true });
  }
  return true;
};

export const initSmartFields = async (fields: SmartField[]) => {
  const _fields = {};
  fields.forEach((field: SmartField) => {
    _fields[field.name] = SmartFieldParser(field);
  });
  return _fields;
};

export const SmartFieldParser = (field: SmartField) => {
  const attributes: any = {};
/*   console.log(
    `Calculating native type for \x1B[44m${field.name}\x1b[0m with given native type prop is \x1B[42m${field.nativeOptions.type}\x1b[0m `
  ); */
  if (field) {
    attributes.type = calculateNativeType(field);
    attributes.allowNull = field.nativeOptions.allowNull;
    attributes.defaultValue = calculateDefaultValue(field);
  }
  return attributes;
};

export const calculateNativeType = (field: SmartField) => {
  //TODO: other data types
  if (field.nativeOptions.type === "STRING") {
    if (field.nativeOptions.length) {
      return DataTypes.STRING(field.nativeOptions.length);
    } else return DataTypes.STRING;
  }
  if (field.nativeOptions.type === "TEXT") {
    return DataTypes.TEXT;
  }
  if (field.nativeOptions.type === "INTEGER") {
    return DataTypes.INTEGER;
  }
  if (field.nativeOptions.type === "INTEGER_UNSIGNED") {
    return DataTypes.INTEGER.UNSIGNED;
  }
  if (field.nativeOptions.type === "INTEGER_ZEROFILL") {
    return DataTypes.INTEGER.ZEROFILL;
  }
  if (field.nativeOptions.type === "INTEGER_UNSIGNED_ZEROFILL") {
    return DataTypes.INTEGER.UNSIGNED.ZEROFILL;
  }
  if (field.nativeOptions.type === "BOOLEAN") {
    return DataTypes.BOOLEAN;
  }
};

export const calculateDefaultValue = (field: SmartField) => {
  //TODO: other data types
  if (
    field.nativeOptions.type === "STRING" ||
    field.nativeOptions.type === "TEXT"
  ) {
    return String(field.nativeOptions.defaultValue);
  }
  if (
    field.nativeOptions.type === "INTEGER" ||
    field.nativeOptions.type === "INTEGER_UNSIGNED" ||
    field.nativeOptions.type === "INTEGER_ZEROFILL" ||
    field.nativeOptions.type === "INTEGER_UNSIGNED_ZEROFILL"
  ) {
    return Number(DataTypes.INTEGER);
  }
  if (field.nativeOptions.type === "BOOLEAN") {
    if (field.nativeOptions.defaultValue === "false") return false;
    return Boolean(field.nativeOptions.defaultValue);
  }
};
