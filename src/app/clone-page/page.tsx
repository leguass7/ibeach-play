"use client";

import { Box, Stack, Heading, Text } from "@chakra-ui/react";

export default function ClonePage() {
  return (
    <Box pt={4} bg={"#8a7f7f"}>
      <Stack direction="column" align="center" justify="center" py={10}>
        <Heading color={"#333"} size="xl" as="h1">
          Como usar Chakra
        </Heading>
        <Text>Testando Pagina</Text>
      </Stack>
    </Box>
  );
}
