import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

export default function SignUp() {
  return (
    <Dialog.Root>
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
            <TextField.Root placeholder="Enter your Username" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root placeholder="Enter your Password" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Login</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
