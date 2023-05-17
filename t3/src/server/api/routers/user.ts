import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({ email: z.string().email("Please provide a valid email") })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) return existingUser;

      const newUser = await ctx.prisma.user.create({
        data: { email: input.email },
      });

      return newUser;
    }),
});
