import { Box, Button, Flex, Heading, Text, TextArea } from "@radix-ui/themes";
import { useParams } from "react-router";

export default function Chat() {
  const { id } = useParams();

  return (
    <Flex height="100vh" direction="column" align="center" justify="center">
      <Flex width="300px" direction="column" align="center" justify="center">
        <Heading size="7">Chatting {id}</Heading>
        <Box height="16px" />
        <Flex
          width="100%"
          height="400px"
          direction="column-reverse"
          overflowY={"scroll"}
          style={{
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid #d4d4d4",
          }}
        >
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
          <Text>안녕하세요 누구님</Text>
        </Flex>
        <Box height="16px" />
        <TextArea
          style={{ width: "100%" }}
          placeholder="메세지를 입력하세요."
        />
        <Box height="16px" />
        <Button style={{ width: "100%" }} color="purple">
          전송
        </Button>
      </Flex>
    </Flex>
  );
}
