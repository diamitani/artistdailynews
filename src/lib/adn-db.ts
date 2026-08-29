import { createClient } from "@supabase/supabase-js";

// Uses the public anon key for frontend/SSR reads, or service role for admin tasks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const adnDb = createClient(supabaseUrl, supabaseKey);

export async function getLatestIssue() {
  const { data, error } = await adnDb
    .from('adn_issues')
    .select(`
      *,
      lead_item:lead_item_id (*)
    `)
    .order('issue_date', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching latest ADN issue:", error);
  }
  
  return data;
}

export async function getArticles(limit = 30, filterPillar?: string, filterPlatform?: string) {
  let query = adnDb
    .from('adn_items')
    .select('*')
    .order('freshness', { ascending: false })
    .limit(limit);
    
  if (filterPillar && filterPillar !== 'All') {
    query = query.eq('pillar', filterPillar.toLowerCase());
  }
  if (filterPlatform && filterPlatform !== 'All') {
    query = query.eq('platform', filterPlatform.toLowerCase());
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching ADN articles:", error);
    return [];
  }
  
  return data;
}

export async function getNewsroomForUser(userId: string) {
  // Get the most recent newsroom generated for this user
  const { data, error } = await adnDb
    .from('adn_newsrooms')
    .select('*')
    .eq('user_id', userId)
    .order('created_for_date', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching ADN newsroom:", error);
  }
  
  return data;
}
