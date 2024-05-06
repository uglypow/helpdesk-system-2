import "reflect-metadata";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import Container from "typedi";
import { IUser } from "../../entities/IUser";
import { UserService } from "./UserService";

@JsonController()
export class UserController {
  userService = Container.get(UserService);

  @Get("/users")
  getAll() {
    return this.userService.getAllUser();
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return this.userService.getUser(id);
  }

  @Post("/users")
  post(@Body() user: IUser) {
    return this.userService.addUser(user);
  }

  @Put("/users/:id")
  put(@Param("id") id: string, @Body() user: IUser) {
    const newUser = {
      ...user,
      id: id,
    };
    return this.userService.updateUser(newUser);
  }

  @Delete("/users/:id")
  remove(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
