import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRespository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRespository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {

    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
      return {
        statusCode: 400,
        body: "Missing ID parameter",
      };
    }
    const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = ["firstName", 'lastName', 'password']
    const someFieldIsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

    if (someFieldIsNotAllowedToUpdate) {
      return {
        statusCode: 400,
        body: "Some fields are not allowed to be updated",
      };
    }

    const user = await this.updateUserRepository.updateUser(id, body);

    return {
      statusCode: 200,
      body: user,
    }

    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal Server Error" + error,
      };
    }
  }


}
