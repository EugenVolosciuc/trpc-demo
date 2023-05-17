import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "~/components/Layout";
import Login from "~/components/Login";
import { useAuthedUser } from "~/utils/user-context";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthedUser();

  useEffect(() => {
    if (!!user) router.push("/posts");
  }, [user]);

  return (
    <Layout>
      <Box mx="auto" width="400px" mt="4">
        <Login />
      </Box>
    </Layout>
  );
};

export default HomePage;
