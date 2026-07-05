import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { testimonialSchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.testimonial,
  entity: "Testimonial",
  createSchema: testimonialSchema,
  updateSchema: testimonialSchema.partial(),
});

export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
