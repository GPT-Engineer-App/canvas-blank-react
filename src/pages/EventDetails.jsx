import { Container, Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { data: event, isLoading: eventLoading } = useEvent(id);
  const { data: comments, isLoading: commentsLoading } = useComments(id);
  const addComment = useAddComment();
  const [newComment, setNewComment] = useState("");

  if (!session) {
    navigate("/login");
  }

  const handleAddComment = () => {
    addComment.mutate({ content: newComment, event_id: id });
    setNewComment("");
  };

  if (eventLoading || commentsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden" width="100%" maxWidth="md">
        <VStack spacing={4}>
          <Heading as="h1" size="xl">{event.name}</Heading>
          <Text>{event.description}</Text>
          <Text>Date: {event.date}</Text>
          <Text>Venue: {event.venue_id}</Text>
          <Heading as="h2" size="lg">Comments</Heading>
          {comments.map(comment => (
            <Box key={comment.id} p={2} borderWidth={1} borderRadius="md" width="100%">
              <Text>{comment.content}</Text>
            </Box>
          ))}
          <Box width="100%">
            <Text>Add a Comment:</Text>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <Button onClick={handleAddComment} colorScheme="blue">Submit</Button>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default EventDetails;