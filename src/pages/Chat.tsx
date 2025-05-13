import { Box, Button, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

interface ChatMessage {
  id: number;
  username: string;
  content: string;
  room: number;
  timestamp: string;
}

export default function Chat() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);

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

  // WebSocket 연결 및 구독 설정
  const setupWebSocket = async () => {
    try {
      // WebSocket 연결
      await WebSocketService.connect();
      setConnected(true);

      // 채팅방 토픽 구독
      WebSocketService.subscribe(
        `/topic/chat.${id}`,
        (message: ChatMessage) => {
          setMessages((prevMessages) => [message, ...prevMessages]);
        }
      );
    } catch (error) {
      console.error("WebSocket 연결 실패:", error);
    }
  };

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }

    // 초기 메시지 로드
    fetchMessages();

    // WebSocket 설정
    setupWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      WebSocketService.disconnect();
    };
  }, [id]);

  const handleSendMessage = async () => {
    if (!username || !content.trim()) {
      return;
    }

    if (!connected) {
      alert("서버에 연결되지 않았습니다. 페이지를 새로고침해 주세요.");
      return;
    }

    const chatMessage = {
      username,
      content,
      room: Number(id),
      timestamp: new Date().toISOString(),
    };

    // WebSocket을 통해 메시지 전송
    WebSocketService.send("/app/chat.sendMessage", chatMessage);

    // 입력 필드 초기화
    setContent("");
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
            messages.map((msg, index) => (
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
            ))
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
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
