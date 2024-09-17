import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


(async() => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  });

  await main();

  await MongoDatabase.disconnect();

})();


const randomEntre0yX = (x: number) => {
  return Math.floor(Math.random() * x);

}


async function main() {

  //borrar la base de datos
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany()
  ])

  //crear usuarios
  const users = await UserModel.insertMany(seedData.users);

  //crear categorias
  const categories = await CategoryModel.insertMany(
    seedData.categories.map( (category) => {

      return {
        ...category,
        user: users[0]._id
      }
    })
  );

  //crear productos
  const products = await ProductModel.insertMany(
    seedData.products.map( (product) => {

      return {
        ...product,
        user: users[randomEntre0yX(seedData.users.length - 1)]._id,
        category: categories[randomEntre0yX(seedData.categories.length - 1)]._id
      }
    })
  );








  console.log('Seeded');

}