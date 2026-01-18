import { Type } from "@sinclair/typebox";
import { CommonSchemas } from "../commons/CommonSchemas.ts";

export const CreateUser = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
  name: Type.String({ minLength: 2 }),
});

export const UpdateUser = Type.Partial(CreateUser);

export const User = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    createdAt: Type.String({ format: "date-time" }), // Исправлено
    updatedAt: Type.String({ format: "date-time" }), // Исправлено
  }),
  Type.Omit(CreateUser, ["password"]),
]);

export const UsersPaginated = CommonSchemas.Pagination.PaginationResult(User);
export const UsersList = Type.Array(User);

export const LoginBody = Type.Pick(CreateUser, ["email", "password"]);

export const LoginResponse = Type.Object({
  accessToken: Type.String(),
  user: User,
});
