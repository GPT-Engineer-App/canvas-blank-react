import { Container, Box, Heading, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, error: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments(id);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const addComment = useAddComment();

  if (!session) {
    navigate("/login");
    return null;
  }

  if (eventLoading || commentsLoading) return <div>Loading...</div>;
  if (eventError) return <div>Error: {eventError.message}</div>;
  if (commentsError) return <div>Error: {commentsError.message}</div>;

  const handleAddComment = () => {
    addComment.mutate({ content: newComment, event_id: id });
    setNewComment("");
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Box mb={4}>
        <Heading>{event.name}</Heading>
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
      <HStack mt={4}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <Button onClick={handleAddComment} colorScheme="blue">
          Add Comment
        </Button>
      </HStack>
    </Container>
  );
};

export default EventDetails;