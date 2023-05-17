import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import Post from "~/components/Post";
import { api } from "~/utils/api";

const PostPage = () => {
  const router = useRouter();
  // TODO: display post data

  return (
    <Layout>
      <Button onClick={() => router.back()}>Back</Button>
      {/* <Post /> */}
    </Layout>
  );
};

export default PostPage;
