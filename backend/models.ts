import { z } from "zod";

const TodoItemId = z.object({
  id: z.string(),
});

const TodoItem = TodoItemId.extend({
  label: z.string(),
});

const TodoItems = z.object({
  todoItems: z.array(TodoItem),
});

export const models = {
  TodoItemId,
  TodoItem,
  TodoItems,
};
