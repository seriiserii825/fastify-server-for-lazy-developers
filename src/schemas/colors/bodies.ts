import { Type } from "@sinclair/typebox";

export const Color = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2 }),
    value: Type.String({
      pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", // ✅ HEX формат
    }),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
]);

export const CreateColor = Type.Pick(Color, ["name", "value", "storeId"]);

export const UpdateColor = Type.Partial(CreateColor);
