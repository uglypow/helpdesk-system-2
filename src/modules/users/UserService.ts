import { Inject, Service } from "typedi";
import { IUser } from "../../entities/IUser";
import { UserRepository } from "./UserRepository";

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepository;

  getAllUser() {
    return this.userRepo.getAllUser();
  }

  getUser(id: number) {
    return this.userRepo.getUser(id);
  }

  addUser(user: IUser) {
    return this.userRepo.addUser(user);
  }

  updateUser(user: IUser) {
    return this.userRepo.updateUser(user);
  }

  deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}
