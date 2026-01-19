import { Type } from "@sinclair/typebox";

export const Color = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    name: Type.Optional(Type.String({ minLength: 2 })),
    value: Type.Optional(Type.String({ format: "hex" })),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    storeId: Type.Number(),
  }),
]);

export const CreateColor = Type.Pick(Color, ["name", "value"]);

export const UpdateColor = Type.Partial(CreateColor);
