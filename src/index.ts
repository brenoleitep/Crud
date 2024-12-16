import { config } from "dotenv";
import express from "express";
import { CreateUserController } from "./controllers/create-user/create-user";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";


const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  const port = process.env.port || 8000;
  await MongoClient.connect();

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const {body, statusCode} = await getUsersController.handle();

    res.status(statusCode).send(body);
  })

  app.post('/users', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({body: req.body});

    res.status(statusCode).send(body);
  })

  app.listen(port, () => {
      console.log( "listening on port " + port)
  });

}

main();


