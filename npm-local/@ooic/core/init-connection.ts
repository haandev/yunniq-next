import { Sequelize, Dialect } from "@sequelize/core";
import { log } from ".";
export { DataTypes, Model, ModelStatic} from "@sequelize/core";
export const sequelize = new Sequelize({
  dialect: process.env.DB_DRIVER as Dialect,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  define: {
    underscored: false,
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
  logQueryParameters: process.env.NODE_ENV === "development",
  logging: false,
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    log("\x1B[33mConnection has been established successfully.\x1B[0m");
  } catch (error) {
    console.error("\x1B[31mUnable to connect to the database:\x1B[0m", error);
  }
};
export const sync = async () => {
  try {
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
      logging: false,
    }); 
    log(`\x1B[32mModels synchronized successfully.\x1B[0m`);
  } catch (error) {
    console.error("\x1B[31mUnable to sync:\x1B[0m", error);
  }
};
