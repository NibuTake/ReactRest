// src/openapi.ts
import * as yaml from "yaml";
import {
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";

import { z } from "zod";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/users/{id}",
  summary: "Get a single user",
  request: {
    params: z.object({ id: z.string() }),
  },

  responses: {
    200: {
      description: "Object with user data.",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

const a = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
    description: "This is the API",
  },
  servers: [{ url: "v1" }],
});

const fileContent = yaml.stringify(a);

console.log(fileContent);
