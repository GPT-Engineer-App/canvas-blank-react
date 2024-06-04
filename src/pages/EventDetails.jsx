import { Container, Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, error: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments(id);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
    return null;
  }

  if (eventLoading || commentsLoading) return <div>Loading...</div>;
  if (eventError) return <div>Error: {eventError.message}</div>;
  if (commentsError) return <div>Error: {commentsError.message}</div>;

  return (
    <Container maxW="container.md" p={4}>
      <Box mb={4}>
        <Heading as="h1" size="xl">{event.name}</Heading>
        <Text>{event.date}</Text>
        <Text>{event.description}</Text>
      </Box>
      <VStack spacing={4} align="stretch">
        {comments.map((comment) => (
          <Box key={comment.id} p={4} borderWidth={1} borderRadius="lg">
            <Text>{comment.content}</Text>
          </Box>
        ))}
      </VStack>
      <Button onClick={() => navigate("/events")} colorScheme="blue" mt={4}>
        Back to Events
      </Button>
    </Container>
  );
};

export default EventDetails;