import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { serviceEntitySchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.service,
  entity: "Service",
  createSchema: serviceEntitySchema,
  updateSchema: serviceEntitySchema.partial(),
});

export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
