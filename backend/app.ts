import fastify from "fastify";

import type { FastifyZod } from "fastify-zod";
import { buildJsonSchemas, register } from "fastify-zod";
import { models } from "./models";

// Global augmentation, as suggested by
// https://www.fastify.io/docs/latest/Reference/TypeScript/#creating-a-typescript-fastify-plugin
declare module "fastify" {
  interface FastifyInstance {
    readonly zod: FastifyZod<typeof models>;
  }
}

const f = fastify();

await register(f, {
  jsonSchemas: buildJsonSchemas(models),
  swaggerOptions: {
    // See https://github.com/fastify/fastify-swagger
  },
  swaggerUiOptions: {
    // See https://github.com/fastify/fastify-swagger-ui
  },
  transformSpec: {}, // optional, see below
});

f.zod.get(
  `/item/:id`,
  {
    operationId: `getTodoItem`,
    params: `TodoItemId`,
    response: {
      200: `TodoItem`,
    },
  },
  ({ params: { id } }, reply) => {
    reply.code(200);
    return Promise.resolve({
      id: id,
      label: "hoge",
    });
  }
);

// Run the server!
try {
  await f.listen({ port: 3000 });
} catch (err) {
  f.log.error(err);
  console.log(err);
}
