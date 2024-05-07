import { IUser } from "@app/abstraction/entities/IUser";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateUserRequest {
  @Expose({ name: "name" })
  @IsOptional()
  @IsString()
  name: string;

  public toUserEntity(): Partial<IUser> {
    const user = {
      name: this.name,
    };
    return user;
  }
}
