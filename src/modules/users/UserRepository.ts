import knex from "knex";
import { Service } from "typedi";
import config from "../../../knexfile";
import { IUser } from "../../abstraction/entities/IUser";

@Service()
export class UserRepository {
  addUser(user: IUser) {
    return knex(config)("users").insert({ name: user });
  }

  getAllUser() {
    return knex(config)("users").select("*");
  }

  getUser(targetID: number) {
    return knex(config)("users").where({ id: targetID });
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
