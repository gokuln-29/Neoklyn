import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { caseStudyEntitySchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.caseStudy,
  entity: "CaseStudy",
  createSchema: caseStudyEntitySchema,
  updateSchema: caseStudyEntitySchema.partial(),
});

export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
