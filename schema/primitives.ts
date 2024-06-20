import { z } from "zod";

export const UserId = z.object({ id: z.string() });
