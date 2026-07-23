import { createClient } from '@supabase/supabase-js'
import type { Database } from './tipos'

const supabaseUrl = 'https://eofkiyvsslugkfmjbgqn.supabase.co';
const supabaseKey = 'sb_publishable_043664-45ny7BpFfJAmFwA_MUFOWuoO';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)