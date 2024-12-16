import { User } from "../../models/user";

export interface UpdateUserParams {
  firtsName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRespository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
