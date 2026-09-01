/**
 * Artist Daily News - Bookmarks Hook
 * React hook for managing user bookmarks with Supabase
 */

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/AuthContext';
import type { AdnUserBookmark } from '../types';

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<AdnUserBookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      setIsLoading(false);
      return;
    }

    const currentUserId = user.id;

    async function fetchBookmarks() {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('adn_user_bookmarks')
          .select('*')
          .eq('user_id', currentUserId)
          .order('saved_at', { ascending: false });

        if (fetchError) throw fetchError;

        setBookmarks(data as AdnUserBookmark[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch bookmarks');
        console.error('Error fetching bookmarks:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookmarks();
  }, [user]);

  const toggleBookmark = async (itemId: string, notes?: string) => {
    if (!user) {
      throw new Error('Must be logged in to bookmark');
    }

    const supabase = createClient();
    const isBookmarked = bookmarks.some((b) => b.item_id === itemId);

    if (isBookmarked) {
      // Remove bookmark
      const { error: deleteError } = await supabase
        .from('adn_user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', itemId);

      if (deleteError) throw deleteError;

      setBookmarks((prev) => prev.filter((b) => b.item_id !== itemId));
    } else {
      // Add bookmark
      const { data, error: insertError } = await supabase
        .from('adn_user_bookmarks')
        .insert({
          user_id: user.id,
          item_id: itemId,
          notes,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setBookmarks((prev) => [data as AdnUserBookmark, ...prev]);
    }
  };

  const isBookmarked = (itemId: string) => {
    return bookmarks.some((b) => b.item_id === itemId);
  };

  return {
    bookmarks,
    isLoading,
    error,
    toggleBookmark,
    isBookmarked,
  };
}
