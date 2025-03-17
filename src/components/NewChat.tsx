import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function NewChat() {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const getCookie = (name: string) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

    return cookieValue || "";
  };

  const handleNewChat = async () => {
    try {
      const currentUsername = getCookie("username");

      if (!currentUsername) {
        alert("You need to be logged in to create a chat");
        return;
      }

      if (!username) {
        alert("Please enter a username to chat with");
        return;
      }

      const members = [currentUsername, username];

      const response = await fetch("/api/room/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ members }),
      });

      if (response.ok) {
        alert("Chat room created successfully!");
        setOpen(false);
        setUsername("");
        document.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          `Failed to create chat room: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button style={{ width: "300px" }}>New Chat</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>New Chat</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make a new chat with someone.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="Enter who you want to chat with"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleNewChat}>New Chat</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
