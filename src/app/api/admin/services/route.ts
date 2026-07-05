import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { serviceEntitySchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.service,
  entity: "Service",
  createSchema: serviceEntitySchema,
  updateSchema: serviceEntitySchema.partial(),
});

export const GET = handlers.GET;
export const POST = handlers.POST;
