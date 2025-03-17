import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ChatBox from "../components/ChatBox";
import { useState, useEffect } from "react";
import NewChat from "../components/NewChat";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);

  const getCookie = (name: string) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

    return cookieValue || "";
  };

  const fetchRooms = async (username: string) => {
    try {
      const response = await fetch(`/api/room/get?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const rooms = await response.json();
        console.log("Fetched rooms:", rooms);
        setRooms(rooms);
      } else {
        console.error("Failed to fetch rooms:", response.status);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
    return [];
  };

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
      setLogin(true);

      fetchRooms(usernameFromCookie);
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
      </Flex>

      <Flex width="300px" direction={"column"} align="center" justify="center">
        {rooms.map((room: { id: number; members: string[] }) => (
          <ChatBox key={room.id} id={room.id} />
        ))}
      </Flex>

      <NewChat />
      <Box height="16px" />
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
