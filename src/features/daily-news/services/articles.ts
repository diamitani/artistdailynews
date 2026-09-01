/**
 * Artist Daily News - Article Service
 * Business logic for fetching and managing news articles
 */

import { createClient } from '@/lib/supabase/server';
import type { AdnItem, Pillar } from '../types';

export async function getLatestArticles(limit = 50): Promise<AdnItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('adn_items')
    .select('*')
    .order('freshness', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data as AdnItem[];
}

export async function getArticlesByPillar(
  pillar: Pillar,
  limit = 20
): Promise<AdnItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('adn_items')
    .select('*')
    .eq('pillar', pillar)
    .order('freshness', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching ${pillar} articles:`, error);
    return [];
  }

  return data as AdnItem[];
}

export async function getArticleById(id: string): Promise<AdnItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('adn_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data as AdnItem;
}

export async function searchArticles(query: string, limit = 20): Promise<AdnItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('adn_items')
    .select('*')
    .or(`title.ilike.%${query}%,dek.ilike.%${query}%`)
    .order('freshness', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return data as AdnItem[];
}
