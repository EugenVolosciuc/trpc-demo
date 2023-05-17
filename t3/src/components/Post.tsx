import { FC } from "react";
import { Box, Heading, IconButton, Text } from "@chakra-ui/react";
import { RouterOutputs } from "~/utils/api";
import { truncate } from "~/utils/truncate";
import Link from "next/link";

interface Props {
  post: RouterOutputs["post"]["getPosts"][0];
}

const Post: FC<Props> = ({ post }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link href="/posts/[id]" as={`/posts/${post.id}`}>
        <Heading fontSize="2xl">{post.title}</Heading>
        <Text fontSize="xs" textColor="gray.600">
          Written by {post.author.email}
        </Text>
        <Text fontSize="xs" textColor="gray.600">
          Read {post.viewCount} time{post.viewCount === 1 ? "" : "s"}
        </Text>
        <Text mt="1">{truncate(post.content)}</Text>
      </Link>
      <Box>
        <IconButton
          aria-label="Search database"
          variant="ghost"
          colorScheme="red"
          icon={<Text>X</Text>}
        />
      </Box>
    </Box>
  );
};

export default Post;
