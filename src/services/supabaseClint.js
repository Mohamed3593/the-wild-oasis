import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wgrnvwyjctktvtqwmeet.supabase.co";
const supabaseKey = "sb_publishable_cSd1QJS6T7VqSQxr6ZB_Hw_rGe0yMLN";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase