import { Type, TSchema } from "@sinclair/typebox";

export const PaginationResult = <T extends TSchema>(itemSchema: T) =>
  Type.Object({
    items: Type.Array(itemSchema),
    total: Type.Number(),
    page: Type.Number(),
    pageSize: Type.Number(),
  });
