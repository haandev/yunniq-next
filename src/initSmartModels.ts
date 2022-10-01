import {
  DataTypes,
  HierarchicalModel,
  log,
  Model,
  sequelize,
} from "@ooic/core";
import { clearLastLine } from "../npm-local/@ooic/core";
import { SmartModels } from "./app";
import { SmartField } from "./model/SmartField";
import { SmartModel } from "./model/SmartModel";
import { SmartRelation } from "./model/SmartRelation";
import { User } from "./model/User";
import { SupportedNativeTypes } from "./smart.types";

const smartPrefix = process.env.DYNAMIC_PREFIX;

export const initSmartModels = async () => {
  log("\n\n\x1B[42mSmartModels > Generating entities started. \x1B[0m ");
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")

  const SmartModelsFetched = await SmartModel.findAll({
    order: [["id", "asc"]],
  });
  
  for (let i = 0; i < SmartModelsFetched.length; i++) {
    const model = SmartModelsFetched[i]
    await initSmartModel(model)
  }
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")
  log(`\x1B[42mSmartModels > Generating entities successfully.\x1B[0m \n\n `);

  log("\n\n\x1B[42mSmartModels > Generating relations started. \x1B[0m ");
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")
  await Promise.all((await SmartRelation.findAll()).map(initSmartRelation));
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")
  log(`\x1B[42mSmartModels > Generating relations successfully.\x1B[0m \n\n `);

  log(`\n\n\x1B[42mSmartModels > Synchronizing smart models started.\x1B[0m  `)
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")
 
  
  clearLastLine();
  for (let i = 0; i < SmartModels.length; i++) {
    const [modelName, model] = SmartModels[i];
    log(
      `\x1B[36mSmartModels > \x1B[42m${modelName}\x1b[0m synchronizing with db.\x1B[0m  `
    );  
    await model.sync().then(() => { 
      clearLastLine();
      log(  
        `\x1B[36mSmartModels > \x1B[42m${modelName}\x1b[0m synchronized successfully.\x1B[0m  `
      ); 
    }); 
  }  
  log("\x1B[42m----------------------------------------------------------------------\x1B[0m  ")
  log(
    `\x1B[42mSmartModels > Synchronizing smart models successfully.\x1B[0m  `
  );
}; 

export const initSmartModel = async (model: SmartModel) => {
  const modelName = model.modelName;
  const smartFields = await SmartField.findAll({
    where: {
      modelId: model.id,
    },
  });

  const patchAttributes = await initSmartFields(smartFields);

  const ModelSelf = model.isHierarchy
  ? class SmartField extends HierarchicalModel {}
  : class SmartField extends Model {};

  SmartModels.push([modelName, ModelSelf] )


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

  ModelSelf.init(attributes, {
    name: {
      singular: model.singular,
      plural: model.plural,
    },
    paranoid: model.paranoid,
    tableName: smartPrefix + model.tableName,
    sequelize,
  }); 

  if (model.isHierarchy) {
    (ModelSelf as any).initHierarchy();
    log(
      `\x1B[36mSmartModels > \x1B[41m***Hierarchical***\x1b[0m \x1B[42m${modelName}\x1b[0m created on the fly.`
    );
  } else {
    log(
      `\x1B[36mSmartModels > \x1B[42m${modelName}\x1b[0m created on the fly.`
    );
  }

  /** Check if there is at least one localized field */
  const localizedSmartFields = smartFields.filter(
    (field) => field.getDataValue("smartOptions").isLocalize === true
  );
  let ModelLocale;
  if (localizedSmartFields.length) {
    const localizedPatchAttributes = await initSmartFields(
      localizedSmartFields
    );
    ModelLocale = sequelize.define(
      model.modelName + "Locale",
      {
        languageCode: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        ...localizedPatchAttributes},
      {
        paranoid: true,
        tableName: smartPrefix + model.tableName + "_locale",
      }
    );
    SmartModels.push([modelName + "Locale",ModelLocale])
    ModelSelf.hasMany(ModelLocale, { as: "locales", foreignKey: "originalId" });
    ModelLocale.belongsTo(ModelSelf, {
      as: "original",
      foreignKey: "originalId",
    });
    log(
      `\x1B[36mSmartModels > \x1b[0mLocalization model \x1B[42m${modelName}Locale\x1b[0m created on the fly.`
    );
  }
  const userOwnable = model.getDataValue("userOwnable");
  if (userOwnable) {
    ModelSelf.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
    if (localizedSmartFields.length) {
      ModelLocale.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
    }
  }
  return true;
};

export const initSmartFields = async (fields: SmartField[]) => {
  const _fields = {};
  fields.forEach((field: SmartField) => {
    const nativeAttributes = SmartFieldParser(field);
    if (nativeAttributes) _fields[field.name] = nativeAttributes;
  });
  return _fields;
};

export const SmartFieldParser = (field: SmartField) => {
  const attributes: any = {};
  if (field) {
    if (!field.smartOptions.nativeOptions?.isModelsOwnField) return false;

    attributes.type = toDataType[field.smartOptions.nativeOptions.type](
      field.smartOptions.nativeOptions.length
    );
    attributes.allowNull = field.smartOptions.nativeOptions.allowNull;
    attributes.defaultValue = asNativeType[
      field.smartOptions.nativeOptions.type
    ](field.smartOptions.nativeOptions.defaultValue);
    return attributes;
  }
  return false;
};

/** string key to DataType object mapper */
export const toDataType: SupportedNativeTypes<(length?: number) => any> = {
  STRING: (length) => (length ? DataTypes.STRING(length) : DataTypes.STRING),
  TEXT: () => DataTypes.STRING,
  INTEGER: () => DataTypes.INTEGER,
  INTEGER_UNSIGNED: () => DataTypes.INTEGER.UNSIGNED,
  INTEGER_ZEROFILL: () => DataTypes.INTEGER.ZEROFILL,
  INTEGER_UNSIGNED_ZEROFILL: () => DataTypes.INTEGER.UNSIGNED.ZEROFILL,
  BOOLEAN: () => DataTypes.BOOLEAN,
};

/** Casting operation that convert given param by db native type */
export const asNativeType: SupportedNativeTypes<(val?: any) => any> = {
  STRING: String,
  TEXT: String,
  INTEGER: Number,
  INTEGER_UNSIGNED: Number,
  INTEGER_ZEROFILL: Number,
  INTEGER_UNSIGNED_ZEROFILL: Number,
  BOOLEAN: (val?: any) => (val === "false" ? false : Boolean(val)),
};

export const initSmartRelation = async (relation: SmartRelation) => {
  const source = await SmartModel.findByPk(relation.sourceModelId),
    target = await SmartModel.findByPk(relation.targetModelId),
    pivotSmartModelTableName =
      smartPrefix + relation.pivotSmartModelTableName ||
      smartPrefix +
        source.tableName +
        "_" +
        target.tableName +
        "_pivot_" +
        relation.id,
    pivotSmartModelName =
      relation.pivotSmartModelName ||
      source.modelName + target.modelName + String(relation.id),
    SourceModel = Object.fromEntries(SmartModels)[source.modelName],
    TargetModel = Object.fromEntries(SmartModels)[target.modelName],
    targetAccessor = relation.targetAccessor,
    sourceAccessor = relation.sourceAccessor;

  /** M:N pivot table created */
  if (relation.isSourceMany && relation.isTargetMany) {
    log(
      `\x1B[36mSmartModels > \x1B[42m${source.modelName}\x1b[0m and \x1B[42m${target.modelName}\x1b[0m has a many to many relation \x1b[0m`
    );
    const PivotModel = sequelize.define(
      pivotSmartModelName,
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
      },
      { timestamps: false, tableName: pivotSmartModelTableName }
    );
    SourceModel.belongsToMany(TargetModel, {
      foreignKey: source.singular + "Id",
      through: PivotModel,
      as: targetAccessor,
    });
    TargetModel.belongsToMany(SourceModel, {
      foreignKey: target.singular + "Id",
      through: PivotModel,
      as: sourceAccessor,
    });

    Object.fromEntries(SmartModels)[pivotSmartModelName] = PivotModel;
    log(
      `\x1B[36mSmartModels > \x1B[42m${pivotSmartModelName}\x1b[0m pivot model is created on the fly and synced with db. \x1b[0m`
    );
  }

  /** 1:M relation, foreign key added to target */
  if (!relation.isSourceMany && relation.isTargetMany) {
    log(
      `\x1B[36mSmartModels > \x1B[42m${source.modelName}\x1b[0m and \x1B[42m${target.modelName}\x1b[0m has a one to many relation \x1b[0m`
    );
    SourceModel.hasMany(TargetModel, {
      as: targetAccessor || target.plural,
      foreignKey: (sourceAccessor || source.singular) + "Id",
    });
    TargetModel.belongsTo(SourceModel, {
      as: sourceAccessor || source.singular,
      foreignKey: (sourceAccessor || source.singular) + "Id",
    });
  }

  /** 1:1 relation, foreign key added to target */
  if (!relation.isSourceMany && !relation.isTargetMany) {
    log(
      `\x1B[36mSmartModels > \x1B[42m${source.modelName}\x1b[0m and \x1B[42m${target.modelName}\x1b[0m has a one to one relation \x1b[0m`
    );
    SourceModel.hasOne(TargetModel, {
      as: targetAccessor || target.singular,
      foreignKey: (sourceAccessor || source.singular) + "Id",
    });
    TargetModel.belongsTo(SourceModel, {
      as: sourceAccessor || source.singular,
      foreignKey: (sourceAccessor || source.singular) + "Id",
    });
  }

  /** M:1 relation, foreign key added to source */
  if (relation.isSourceMany && !relation.isTargetMany) {
    log(
      `\x1B[36mSmartModels > \x1B[42m${source.modelName}\x1b[0m and \x1B[42m${target.modelName}\x1b[0m has a many to one relation \x1b[0m`
    );
    SourceModel.belongsTo(TargetModel, {
      as: targetAccessor || target.singular,
      foreignKey: (targetAccessor || target.singular) + "Id",
    });
    TargetModel.hasMany(SourceModel, {
      as: sourceAccessor || source.plural,
      foreignKey: (targetAccessor || target.singular) + "Id",
    });
  }
};
