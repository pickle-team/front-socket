import { Box, Button, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function Chat() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  const getCookie = (name: string) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

    return cookieValue || "";
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched messages:", data);
        setMessages(data);
      } else {
        console.error("Failed to fetch messages:", response.status);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!content.trim()) {
      return;
    }

    try {
      const username = getCookie("username");

      if (!username) {
        alert("You must be logged in to send messages");
        return;
      }

      const time = new Date().toISOString();

      const response = await fetch("/api/chat/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: id,
          username,
          content,
          timestamp: time,
        }),
      });

      if (response.ok) {
        setContent("");
        fetchMessages();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message");
    }
  };

  return (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Flex width="300px" direction="column" align="center" justify="center">
        <Heading size="7">Chatting {id}</Heading>
        <Box height="16px" />
        <Text>{username}로 로그인 됨</Text>
        <Box height="16px" />
        <Flex
          width="100%"
          height="400px"
          direction="column-reverse"
          overflowY="scroll"
          style={{
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid #d4d4d4",
          }}
        >
          {messages.length > 0 ? (
            messages.map(
              (
                msg: {
                  username: string;
                  content: string;
                  room: number;
                  id: number;
                },
                index
              ) => (
                <Box
                  key={index}
                  style={{
                    marginBottom: "8px",
                    alignSelf:
                      msg.username === username ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.username === username ? "#e3f2fd" : "#f5f5f5",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "80%",
                  }}
                >
                  <Text size="2" weight="bold">
                    {msg.username + " "}
                  </Text>
                  <Text>{msg.content}</Text>
                </Box>
              )
            )
          ) : (
            <Text>No messages yet</Text>
          )}
        </Flex>
        <Box height="16px" />
        <TextArea
          style={{ width: "100%" }}
          placeholder="메세지를 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box height="16px" />
        <Button
          style={{ width: "100%" }}
          color="purple"
          onClick={handleSendMessage}
        >
          전송
        </Button>
      </Flex>
    </Flex>
  );
}
