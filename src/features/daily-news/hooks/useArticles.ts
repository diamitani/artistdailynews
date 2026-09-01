/**
 * Artist Daily News - Articles Hook
 * React hook for managing article data with client-side Supabase
 */

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AdnItem, Pillar } from '../types';

export function useArticles(pillar?: Pillar, limit = 50) {
  const [articles, setArticles] = useState<AdnItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        let query = supabase
          .from('adn_items')
          .select('*')
          .order('freshness', { ascending: false })
          .limit(limit);

        if (pillar) {
          query = query.eq('pillar', pillar);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setArticles(data as AdnItem[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, [pillar, limit]);

  return { articles, isLoading, error };
}

export function useArticleById(id: string) {
  const [article, setArticle] = useState<AdnItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('adn_items')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        setArticle(data as AdnItem);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch article');
        console.error('Error fetching article:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return { article, isLoading, error };
}
