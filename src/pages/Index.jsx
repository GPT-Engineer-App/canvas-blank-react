import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useBreakpointValue, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaCog } from "react-icons/fa";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const { data: events, isLoading } = useEvents();

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
        {!session ? (
            <Button onClick={() => navigate("/login")} colorScheme="blue">
              Login
            </Button>
          ) : (
            <>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
              {isLoading ? (
                <Text>Loading events...</Text>
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Date</Th>
                      <Th>Description</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {events.map(event => (
                      <Tr key={event.id}>
                        <Td>{event.name}</Td>
                        <Td>{event.date}</Td>
                        <Td>{event.description}</Td>
                        <Td>
                          <Button onClick={() => navigate(`/events/${event.id}`)} colorScheme="blue">
                            View Details
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;