import { clearLastLine, log } from "@ooic/core";
import { SmartField } from "./SmartField";
import { SmartModel } from "./SmartModel";
import { SmartRelation } from "./SmartRelation";

let ids: any = {};

const asyncSeed = async () => {
  log("\n\n\x1B[36mDB > seeding started.\x1B[0m ");

  /** create Company model */
  await SmartModel.findOrCreate({
    where: {
      tableName: "companies",
      modelName: "Company",
      description: "Company is a company model",
      icon: "company",
      isHierarchy: false,
      sortable: true,
      userOwnable: true, 
      groupOwnable: false,
    }, 
  }).then((data) => (ids.CompanyModel = data[0].id));

  await SmartField.findOrCreate({
    where: {
      name: "title",
      title: "Title",
      icon: "title",

      smartOptions: {
        nativeOptions: {
          type: "STRING",
          length: 255,
          allowNull: false,
          defaultValue: "",
          isModelsOwnField: true,
        },
        renderUi: { props: {}, component: "TextInput" },
        smartType: "SmartText",
        isLocalize: false,
      },
      modelId: ids.CompanyModel,
    },
    defaults: {
      description: " ",
    },
  }); 

  /** create category model */
  await SmartModel.findOrCreate({
    where: {
      tableName: "categories",
      modelName: "Category",
      description: "Category is a category model",
      icon: "category",
      isHierarchy: true,
      sortable: true,
      userOwnable: true,
      paranoid:true
    },
  }).then((data) => (ids.CategoryModel = data[0].id));

  await SmartField.findOrCreate({
    where: {
      name: "title",
      title: "Title", 
      icon: "title",
      smartOptions: {
        nativeOptions: {
          type: "STRING",
          length: 255,
          allowNull: false,
          defaultValue: "",
          isModelsOwnField: true, 
        },
        renderUi: { props: {}, component: "TextInput" },
        smartType: "SmartText",
        isLocalize: true,
      },
      modelId: ids.CategoryModel,
    },
    defaults: {
      description: " ",
    },
  });

  await SmartField.findOrCreate({
    where: {
      name: "subtitle",
      title: "Subtitle",
      icon: "title",

      smartOptions: {
        nativeOptions: {
          type: "STRING",
          length: 255,
          allowNull: false,
          defaultValue: "",
          isModelsOwnField: true,
        },
        renderUi: { props: {}, component: "TextInput" },
        smartType: "SmartText",
        isLocalize: true,
      },
      modelId: ids.CategoryModel,
    },
    defaults: {
      description: " ",
    },
  });

  /** create category-company relation */
  await SmartRelation.findOrCreate({ 
    where: {
      sourceModelId: ids.CategoryModel,
      isSourceMany: true,
      targetModelId: ids.CompanyModel,
      isTargetMany: false,
    },
  });

  /** create table model */
  await SmartModel.findOrCreate({
    where: {
      tableName: "tables",
      modelName: "Table",
      description: "Table is a table model",
      icon: "table",
      isHierarchy: false,
      sortable: true,
      userOwnable: true,
    },
  }).then((data) => (ids.TableModel = data[0].id));

  await SmartField.findOrCreate({
    where: {
      name: "title",
      title: "title",
      icon: "title",

      smartOptions: {
        nativeOptions: {
          type: "STRING",
          length: 255,
          allowNull: false,
          defaultValue: "",
          isModelsOwnField: true,
        },
        renderUi: { props: {}, component: "TextInput" },
        smartType: "SmartText",
        isLocalize: false,
      },
      modelId: ids.TableModel,
    },
    defaults: {
      description: " ",
    },
  });

  await SmartField.findOrCreate({
    where: {
      name: "qr",
      title: "QR",
      icon: "title",

      smartOptions: {
        nativeOptions: {
          type: "STRING",
          length: 255,
          allowNull: false,
          defaultValue: "",
          isModelsOwnField: true,
        },
        renderUi: { props: {}, component: "TextInput" },
        smartType: "SmartText",
        isLocalize: false,
      },
      modelId: ids.TableModel,
    },
    defaults: {
      description: " ",
    },
  });

  /** create table-company relation */
  await SmartRelation.findOrCreate({ 
    where: {
      sourceModelId: ids.TableModel,
      isSourceMany: true,
      targetModelId: ids.CompanyModel,
      isTargetMany: false,
    },
  }); 


    /** create product model */
    await SmartModel.findOrCreate({
      where: {
        tableName: "products",
        modelName: "Product",
        description: "Product is a product model",
        icon: "product",
        isHierarchy: false,
        sortable: true,
        userOwnable: true,
        paranoid:true
      },
    }).then((data) => (ids.ProductModel = data[0].id));


    await SmartField.findOrCreate({
      where: {
        name: "title",
        title: "Title",
        icon: "title",
        smartOptions: {
          nativeOptions: {
            type: "STRING",
            length: 255,
            allowNull: false,
            defaultValue: "",
            isModelsOwnField: true, 
          },
          renderUi: { props: {}, component: "TextInput" },
          smartType: "SmartText",
          isLocalize: true,
        },
        modelId: ids.ProductModel,
      },
      defaults: {
        description: " ",
      },
    });

    await SmartField.findOrCreate({
      where: {
        name: "description",
        title: "Description",
        icon: "description",
        smartOptions: {
          nativeOptions: {
            type: "TEXT",
            allowNull: false,
            defaultValue: "",
            isModelsOwnField: true, 
          },
          renderUi: { props: {}, component: "TextInput" },
          smartType: "SmartText",
          isLocalize: true,
        },
        modelId: ids.ProductModel,
      },
      defaults: {
        description: " ",
      },
    });

    await SmartField.findOrCreate({
      where: {
        name: "allergens",
        title: "Aescription",
        icon: "description",
        smartOptions: {
          nativeOptions: {
            type: "TEXT",
            allowNull: false,
            defaultValue: "",
            isModelsOwnField: true, 
          },
          renderUi: { props: {}, component: "TextInput" },
          smartType: "SmartText",
          isLocalize: true,
        },
        modelId: ids.ProductModel,
      },
      defaults: {
        description: " ",
      },
    });

    await SmartField.findOrCreate({
      where: {
        name: "price",
        title: "Price",
        icon: "price",
        smartOptions: {
          nativeOptions: {
            type: "STRING",
            length: 255,
            allowNull: false,
            defaultValue: "",
            isModelsOwnField: true, 
          },
          renderUi: { props: {}, component: "TextInput" },
          smartType: "SmartText",
          isLocalize: false,
        },
        modelId: ids.ProductModel,
      },
      defaults: {
        description: " ",
      },
    });

  /** create product-category relation */
  await SmartRelation.findOrCreate({ 
    where: {
      sourceModelId: ids.ProductModel,
      isSourceMany: true,
      targetModelId: ids.CategoryModel,
      isTargetMany: false,
    },
  });  
  clearLastLine()
  log("\x1B[32mDB > Seeded successfully.\x1B[0m ");
};

export default asyncSeed;
