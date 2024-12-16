import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor (private readonly createUserRepository: ICreateUserRepository) {


  }
  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      const requiredFields = ['firstName', 'lastName', 'email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `${field} is required`
          }
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: 'Invalid email address'
        }
      }

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Algo deu errado. ${error}`
      }
    }
  }
}
