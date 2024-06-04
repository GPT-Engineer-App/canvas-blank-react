import { createClient } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = new QueryClient();

export const SupabaseProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

/* supabase integration types

Events // table: events
    id: number
    created_at: string
    name: string
    date: string
    description: string
    venue_id: number
    is_pinned: boolean

Comments // table: comments
    id: number
    created_at: string
    content: string
    event_id: number

Venues // table: venues
    id: number
    name: string
    location: string
    description: string
    created_at: string
    updated_at: string

Users // table: users
    id: number
    created_at: string
    email: string
    password: string
    role: string

*/

// Hooks for Events table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => supabase.from('events').select('*'),
});
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => supabase.from('events').insert([newEvent]),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (eventId) => supabase.from('events').delete().eq('id', eventId),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for Comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => supabase.from('comments').select('*'),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => supabase.from('comments').insert([newComment]),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => supabase.from('comments').update(updatedComment).eq('id', updatedComment.id),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId) => supabase.from('comments').delete().eq('id', commentId),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for Venues table
export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => supabase.from('venues').select('*'),
});
export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => supabase.from('venues').insert([newVenue]),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};
export const useUpdateVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedVenue) => supabase.from('venues').update(updatedVenue).eq('id', updatedVenue.id),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};
export const useDeleteVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (venueId) => supabase.from('venues').delete().eq('id', venueId),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

// Hooks for Users table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => supabase.from('users').select('*'),
});
export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => supabase.from('users').insert([newUser]),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => supabase.from('users').update(updatedUser).eq('id', updatedUser.id),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => supabase.from('users').delete().eq('id', userId),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};