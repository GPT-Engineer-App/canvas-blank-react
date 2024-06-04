import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaCog } from "react-icons/fa";

const Index = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        <Spacer />
        <Box display={{ base: "none", md: "block" }}>
          <IconButton aria-label="Home" icon={<FaHome />} variant="ghost" color="white" />
          <IconButton aria-label="About" icon={<FaInfoCircle />} variant="ghost" color="white" />
          <IconButton aria-label="Settings" icon={<FaCog />} variant="ghost" color="white" />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton aria-label="Menu" icon={<FaCog />} variant="ghost" color="white" />
        </Box>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;