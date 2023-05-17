import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from "./server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: `http://localhost:2022`,
    }),
  ],
});

async function main() {
  const helloResponse = await trpc.greeting.hello.query({
    name: "world!",
  });

  console.log("helloResponse", helloResponse);

  const createPostRes = await trpc.post.createPost.mutate({
    title: "hello world",
    text: "check out https://tRPC.io",
  });

  console.log("createPostResponse", createPostRes);
}

void main();
