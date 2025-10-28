-- Remove the public SELECT policy on chat_messages
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;

-- Users can only insert their own messages (no SELECT access)
-- Messages will be retrieved through a secure edge function