import { Type } from "@sinclair/typebox";

export const Store = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    title: Type.String({ minLength: 2 }),
    description: Type.Union([Type.String({ minLength: 2 }), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
]);

export const CreateStore = Type.Composite([
  Type.Pick(Store, ["title"]), // Обязательные поля
  Type.Partial(Type.Pick(Store, ["description"])), // Опциональные поля
]);

export const UpdateStore = Type.Partial(CreateStore);
