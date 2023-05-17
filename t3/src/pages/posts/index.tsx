import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  Divider,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuthedUser } from "~/utils/user-context";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import PostsList from "~/components/PostsList";
import CreatePostModal from "~/components/CreatePostModal";

const PostsPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthedUser();
  const { data, isLoading } = api.post.getPosts.useQuery();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  let content = <Text>No posts found</Text>;

  if (isLoading)
    content = (
      <Center>
        <Spinner />
      </Center>
    );

  if (!!data?.length) content = <PostsList posts={data} />;

  return (
    <Layout>
      <CreatePostModal isOpen={isOpen} onClose={onToggle} />
      <Button onClick={onToggle}>Create post</Button>
      <Divider my="2" />
      {content}
    </Layout>
  );
};

export default PostsPage;
