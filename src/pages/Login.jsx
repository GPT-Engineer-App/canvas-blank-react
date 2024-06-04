import { Container, Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { SupabaseAuthUI, useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  if (session) {
    navigate("/");
  }

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden" width="100%" maxWidth="md">
        <VStack spacing={4}>
          <Heading as="h1" size="xl">Login</Heading>
          <Text>Welcome back! Please login to your account.</Text>
          <SupabaseAuthUI />
          {session && (
            <Button onClick={logout} colorScheme="red">
              Logout
            </Button>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;