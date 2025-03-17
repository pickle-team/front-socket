import { Box, Text } from "@radix-ui/themes";
import { Link } from "react-router";

export default function ChatBox({ id }: { id: number }) {
  return (
    <Link style={{ width: "100%" }} to={`/chat/${id}`}>
      <Box width="100%">
        <Box
          width="100%"
          style={{
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid #d4d4d4",
          }}
        >
          <Text>{id} 채팅</Text>
        </Box>
        <Box height="16px" />
      </Box>
    </Link>
  );
}
