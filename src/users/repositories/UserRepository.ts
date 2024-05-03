import knex from "knex";
import config from "../../../knexfile";
import { IUser } from "./IUser";
export class UserRepository {
  addUser(user: IUser) {
    return knex(config)("users").insert({
      name: user.name,
    });
  }

  getAllUser() {
    return knex(config)("users").select("*");
  }

  getUser(targetID: number) {
    return knex(config)("users").where({ id: targetID }).select("id", "name");
  }

  updateUser(user: IUser) {
    return knex(config)("users")
      .where({ id: user.id })
      .update({ name: user.name });
  }

  deleteUser(targetID: string) {
    return knex(config)("users").where({ id: targetID }).del();
  }
}
