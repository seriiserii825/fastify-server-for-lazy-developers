import { Type } from "@sinclair/typebox";

export const Review = Type.Intersect([
  Type.Object({
    id: Type.Number(),
    userId: Type.Number(),
    storeId: Type.Number(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  }),
]);

export const CreateReview = Type.Pick(Review, ["userId", "storeId"]);

export const UpdateReview = Type.Partial(CreateReview);
