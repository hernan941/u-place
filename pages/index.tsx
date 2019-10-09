import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext } from "react";

import { Box, List, ListItem, Stack, Text } from "@chakra-ui/core";

import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

const UsersList: FC = () => {
  const [{ data, loading, error }] = useAxios<User[]>("/api/users");

  if (loading) {
    return <p>Loading Users...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <Box p={3}>
      <Stack spacing={10}>
        {data.map(({ email, password }, key) => (
          <Box p={5} key={key} shadow="md" borderWidth="1px">
            <List styleType="disc">
              <ListItem>Email: {email}</ListItem>
              <ListItem>Password: {password}</ListItem>
            </List>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const Index: NextPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return <UsersList />;
  }
  return <Text>You need to be authenticated!</Text>;
};

export default Index;
