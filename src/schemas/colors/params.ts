import { Type } from "@sinclair/typebox";

export const ColorId = Type.Object({
  colorId: Type.Number(),
});

export const StoreId = Type.Object({
  storeId: Type.Number(),
});
