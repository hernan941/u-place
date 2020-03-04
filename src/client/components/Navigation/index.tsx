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
        <Stack isInline
          display="flex"
          justifyContent="space-between"
        >
          <Alert status="success">
            <AlertIcon />
            welcome {user.email}
          </Alert>
          <div className="menu-container">
            <Menu>
              <MenuButton as={Button} >
                Actions
             </MenuButton>

              <MenuList>
                <Link href="/" passHref><MenuItem>Map</MenuItem></Link>
                <Link href="/notices" passHref><MenuItem>Notices</MenuItem></Link>
                <Link href="/acount" passHref><MenuItem>Acount</MenuItem></Link>
                <Link href="/" passHref><MenuItem onClick={() => logout()}>Logout</MenuItem></Link>
              </MenuList>
            </Menu>
          </div>


          {/* 
          <Button variantColor="red" variant="outline" onClick={() => logout()}>
            Logout
          </Button> */}
        </Stack>
      ) : (
          <Stack
            isInline display="flex"
            justifyContent="space-between"
            m={0}>
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
