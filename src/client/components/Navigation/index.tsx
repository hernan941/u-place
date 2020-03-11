import Link from "next/link";
import { FC, useContext } from "react";

import { Alert, AlertIcon, Box, Button, Stack, MenuButton, MenuItem, MenuList, Menu } from "@chakra-ui/core";

import { AuthContext } from "../Auth/Context";

const Navigation: FC = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }
  return (
    <nav className="nav-container">
      {user ? (
          <h1 style={{paddingTop: 10}}>placeholders</h1>
      ) : (
          <Stack
            isInline display="flex"
            justifyContent="space-between"
            >
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
