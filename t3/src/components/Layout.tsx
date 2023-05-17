import { Box, StyleProps } from "@chakra-ui/react";
import { PropsWithChildren, FC } from "react";

import Header from "~/components/Header";

const Layout: FC<PropsWithChildren<StyleProps>> = ({
  children,
  ...otherProps
}) => {
  return (
    <Box width="full" {...otherProps}>
      <Header />
      <Box width="container.lg" mx="auto" px="2" as="main">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
