import { Type } from "@sinclair/typebox";

export const Category = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    title: Type.Optional(Type.String({ minLength: 2 })),
    description: Type.Optional(Type.String({ format: "hex" })),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    storeId: Type.Number(),
  }),
]);

export const CreateCategory = Type.Pick(Category, ["title", "description"]);

export const UpdateCategory = Type.Partial(CreateCategory);
