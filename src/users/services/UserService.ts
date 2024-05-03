import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../repositories/IUser";
export class UserService {
  userRepo = new UserRepository();

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

  delete(id: string) {
    return this.userRepo.deleteUser(id);
  }
}
