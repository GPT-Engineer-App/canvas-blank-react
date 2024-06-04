import { Container, Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Events = () => {
  const { data: events, isLoading, error } = useEvents();
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxW="container.xl" p={4}>
      <Box overflowX="auto">
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
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => navigate(`/events/${event.id}`)}>
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Events;