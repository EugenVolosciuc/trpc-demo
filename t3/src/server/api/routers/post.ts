import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), authorId: z.number() })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: { connect: { id: input.authorId } },
          published: true,
        },
      });

      return post;
    }),
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({ include: { author: true } });

    return posts;
  }),
  // TODO: getPost procedure
});
