import Link from "next/link";
import { FC, useContext } from "react";

import { Alert, AlertIcon, Box, Button, Stack } from "@chakra-ui/core";

import { AuthContext } from "../Auth/Context";

const Navigation: FC = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }
  return (
    <nav>
      {user ? (
        <Stack isInline alignItems="center">
          <Alert status="success">
            <AlertIcon />
            Welcome {user.email}
          </Alert>
          <Button variantColor="red" variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack isInline>
          <Box>
            <Link href="/login" passHref>
              <Button variantColor="teal" variant="outline">
                Login
              </Button>
            </Link>
          </Box>
          <Box>
            <Link href="/signUp" passHref>
              <Button variantColor="green" variant="outline">
                Sign Up
              </Button>
            </Link>
          </Box>
        </Stack>
      )}
    </nav>
  );
};

export default Navigation;
