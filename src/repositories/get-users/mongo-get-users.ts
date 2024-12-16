import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { IUser } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    return [{
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123"
    }]
  }
}