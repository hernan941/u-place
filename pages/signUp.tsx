import { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { isEmail, isLength } from "validator";

import { Alert, AlertIcon, Box, Button, Input, Stack, Text } from "@chakra-ui/core";

import { AuthContext } from "../src/client/components/Auth/Context";

const SignUpPage: NextPage = () => {
  const { signUp, error, user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);
  const valid = isEmail(email) && isLength(password, { min: 3, max: 100 });

  if (loading || user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {error && (
        <div>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </div>
      )}
      <form
        onSubmit={async e => {
          e.preventDefault();
          signUp({ email, password });
        }}
      >
        <Stack m={5}>
          <Box>
            <Text>Email</Text>
            <Input
              name="email"
              type="email"
              value={email}
              isFullWidth={false}
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => setEmail(value)}
            />
          </Box>
          <Box>
            <Text>Password</Text>
            <Input
              name="password"
              type="password"
              value={password}
              isFullWidth={false}
              onChange={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => setPassword(value)}
            />
          </Box>
          <Box>
            <Button
              isDisabled={!valid}
              type="submit"
              variantColor="blue"
              variant="outline"
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default SignUpPage;
