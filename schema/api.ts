// src/openapi.ts
import * as yaml from "yaml";
import {
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";

import * as fs from "fs";
import { z } from "zod";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserSchema } from "./schemas";
import { UserId } from "./primitives";

extendZodWithOpenApi(z);

const writeDocumentation = (registry: OpenAPIRegistry) => {
  // OpenAPI JSON
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const docs = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API",
    },
    servers: [{ url: "v1" }],
  });

  fs.writeFileSync(`${__dirname}/../openapi-docs.yml`, yaml.stringify(docs), {
    encoding: "utf-8",
  });
};

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/users/{id}",
  summary: "Get a single user",
  request: {
    params: UserId,
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

writeDocumentation(registry);
