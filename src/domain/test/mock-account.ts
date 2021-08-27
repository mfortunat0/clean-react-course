import { AuthenticationParams } from "@/domain/usecases/index";
import { AccountModel } from "../models/index";
import faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
