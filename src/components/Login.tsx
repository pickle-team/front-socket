import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/member/login", {
        method: "POST",
        body: formData,
      });

      const responseClone = response.clone();

      const bodyText = await responseClone.text();

      if (response.ok && bodyText !== "fail") {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `username=${username}; expires=${expiryDate.toUTCString()}; path=/`;

        setOpen(false);
        window.location.reload();
      } else {
        alert(`Login failed`);
      }
    } catch {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Login</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Please login and enjoy the chat.
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
          <Button onClick={handleSubmit}>Login</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
