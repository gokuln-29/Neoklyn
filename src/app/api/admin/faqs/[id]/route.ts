import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { faqEntitySchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.fAQ,
  entity: "FAQ",
  createSchema: faqEntitySchema,
  updateSchema: faqEntitySchema.partial(),
});

export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
