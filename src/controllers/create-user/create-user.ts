import validator from "validator";
import { User } from "../../models/user";
import { badRequest, created } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor (private readonly createUserRepository: ICreateUserRepository) {}
  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const { body } = httpRequest;

      const requiredFields = ['firstName', 'lastName', 'email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) {
        return badRequest("Invalid email")
      }

      const user = await this.createUserRepository.createUser(body!);

      return created<User>(user);
    } catch (error) {
      return {
        statusCode: 500,
        body: `Algo deu errado. ${error}`
      }
    }
  }
}
