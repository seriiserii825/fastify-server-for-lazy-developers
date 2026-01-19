import { Type } from "@sinclair/typebox";

export const UserId = Type.Object({
  userId: Type.Number(),
});

export const ProductId = Type.Object({
  productId: Type.Number(),
});
