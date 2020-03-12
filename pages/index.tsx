import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext } from "react";

import { Box, List, ListItem, Stack, Text } from "@chakra-ui/core";

import { AuthContext } from "../src/client/components/Auth/Context";
//
import MyMap from "../src/client/components/Map";
import MyButton from "../src/client/components/MyButton";
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
   
    return <div className="map-container">
      <MyMap />
      <MyButton/>
    </div>

};


export default Index;
