import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRespository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRespository) {}
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {

    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing id parameter");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = ["firstName", 'lastName', 'password']
      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Missing id parameter");
      }

      const user = await this.updateUserRepository.updateUser(id, body!);

      return ok<User>(user);
    } catch {
        return serverError();
    }
  }
}
