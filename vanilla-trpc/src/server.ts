import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const publicProcedure = t.procedure;

// Routers
const greetingRouter = t.router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => `Hello, ${input.name}!`),
});

const postRouter = t.router({
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ input }) => {
      // imagine a db call here
      return {
        id: `${Math.random()}`,
        ...input,
      };
    }),
});

// Merge routers together
const appRouter = t.router({
  greeting: greetingRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

// HTTP server
const { listen } = createHTTPServer({
  router: appRouter,
  createContext: ({ req, res }) => {
    console.log("This runs in on every request");

    return {};
  },
});

listen(2022);
