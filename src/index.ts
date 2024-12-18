import { config } from "dotenv";
import express from "express";
import { CreateUserController } from "./controllers/create-user/create-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { GetUsersController } from "./controllers/get-users/get-users";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoUpdateUserRespository } from "./repositories/update-user/mongo-update-user";


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

  app.patch('/users/:id', async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRespository();

    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const { body, statusCode } = await updateUserController.handle({body: req.body, params: req.params});

    res.status(statusCode).send(body);
  })

  app.delete('/users/:id', async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);

    const { body, statusCode } = await deleteUserController.handle({params: req.params});

    res.status(statusCode).send(body);
  })

  app.listen(port, () => {
      console.log( "listening on port " + port)
  });

}

main();


