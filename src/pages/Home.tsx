import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);
  const name = "치즈";
  return login ? (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Button color="purple" onClick={() => setLogin(false)}>
        로그 아웃
      </Button>
      <Flex width="300px" direction="column" align="center" justify="center">
        <Heading size="7">Chatting</Heading>
        <Box height="16px" />
        <Text>안녕하세요 {name}님</Text>
        <Box height="16px" />
        <ChatBox id="1" />
        <ChatBox id="2" />
        <ChatBox id="3" />
      </Flex>
      <Button color="red">LogOut</Button>
    </Flex>
  ) : (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Button color="purple" onClick={() => setLogin(true)}>
        로그인
      </Button>
      <Heading size="7">Chatting</Heading>
      <Box height="16px" />
      <Flex gap="8px">
        <Login />
        <SignUp />
      </Flex>
    </Flex>
  );
}
