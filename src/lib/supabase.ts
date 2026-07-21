import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eofkiyvsslugkfmjbgqn.supabase.co';
const supabaseKey = 'sb_publishable_043664-45ny7BpFfJAmFwA_MUFOWuoO';

export const supabase = createClient(supabaseUrl, supabaseKey)