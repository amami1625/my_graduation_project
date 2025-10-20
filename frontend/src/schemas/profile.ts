import { z } from 'zod';

export const profileSchema = z.object({
  id: z.number(),
  supabase_uid: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
