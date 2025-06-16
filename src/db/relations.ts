import { relations } from "drizzle-orm";
import { user, todo } from "./schema";

export const userRelations = relations(user, ({ many }) => ({
  todos: many(todo),
}));

export const todoRelations = relations(todo, ({ one }) => ({
  creator: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
}));
