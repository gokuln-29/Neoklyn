import { makeCrudHandlers, db } from "@/lib/simpleCrud";
import { teamMemberSchema } from "@/lib/entitySchemas";

const handlers = makeCrudHandlers({
  model: db.teamMember,
  entity: "TeamMember",
  createSchema: teamMemberSchema,
  updateSchema: teamMemberSchema.partial(),
});

export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
