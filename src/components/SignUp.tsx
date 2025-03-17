import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:8080/member/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Registration successful!");
        setOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Sign Up</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Sign Up</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Please signup and enjoy the chat.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleSubmit}>Sign Up</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
