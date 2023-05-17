import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { api } from "~/utils/api";
import { theme } from "~/config/theme";

import "~/styles/globals.css";
import { AuthedUser, UserProvider } from "~/utils/user-context";
import { useState } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [authedUser, setAuthedUser] = useState<AuthedUser>(null);

  return (
    <ChakraProvider theme={theme}>
      <UserProvider value={{ user: authedUser, setUser: setAuthedUser }}>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
