import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ChatBox from "../components/ChatBox";
import { useState, useEffect } from "react";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");

  const getCookie = (name: string) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

    return cookieValue || "";
  };

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLogin(false);
    setUsername("");
  };

  return login ? (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Flex width="300px" direction="column" align="center" justify="center">
        <Heading size="7">Chatting</Heading>
        <Box height="16px" />
        <Text>안녕하세요 {username}님</Text>
        <Box height="16px" />
        <ChatBox id="1" />
        <ChatBox id="2" />
        <ChatBox id="3" />
      </Flex>
      <Button color="red" onClick={handleLogout}>
        LogOut
      </Button>
    </Flex>
  ) : (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Heading size="7">Chatting</Heading>
      <Box height="16px" />
      <Flex gap="8px">
        <Login />
        <SignUp />
      </Flex>
    </Flex>
  );
}
