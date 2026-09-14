"use client";

import { useEffect, useRef } from "react";

type AnalyticsTrackerProps = {
  articleId?: string;
  articleSlug?: string;
};

const ANON_KEY = "adn_anon";
const SESSION_KEY = "adn_session";

function getOrCreateAnonId(): string {
  try {
    let id = window.localStorage.getItem(ANON_KEY);
    if (!id) {
      id = `anon_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return `anon_mem_${Math.random().toString(36).slice(2, 10)}`;
  }
}

function getOrCreateSessionId(): string {
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `sess_mem_${Math.random().toString(36).slice(2, 8)}`;
  }
}

function sendEvent(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  const url = "/api/events";
  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Client-side reader analytics:
 * - page_view on mount
 * - engaged_read once: 45s of active visible time OR 60% scroll depth (whichever first)
 * - delegated clicks on [data-track-event] for source_click / share / signup / offer_click
 * Mount once per page; pass articleSlug on article pages.
 */
export default function AnalyticsTracker({ articleId, articleSlug }: AnalyticsTrackerProps) {
  const engagedSent = useRef(false);
  const base = useRef<Record<string, unknown>>({});

  useEffect(() => {
    const anonId = getOrCreateAnonId();
    const sessionId = getOrCreateSessionId();
    // When mounted without explicit props (e.g. in the root layout), derive the
    // article slug from the URL so article page views are attributed correctly.
    const pathSlug = window.location.pathname.match(/^\/news\/([^/]+)\/?$/)?.[1] || null;
    base.current = {
      articleId: articleId || null,
      articleSlug: articleSlug || pathSlug,
      sessionId,
      anonId,
      referrer: document.referrer || null,
    };

    // page_view
    sendEvent({ ...base.current, event: "page_view" });

    const fireEngaged = () => {
      if (engagedSent.current) return;
      engagedSent.current = true;
      sendEvent({ ...base.current, event: "engaged_read" });
      // Stop the engaged-read triggers only — the click delegation stays
      // mounted for the lifetime of the page.
      stopEngagedTriggers();
    };

    // ── 45s active visible time (visibilitychange-aware) ──
    let activeSeconds = 0;
    let tick: ReturnType<typeof setInterval> | null = null;
    const isVisible = () => document.visibilityState === "visible";

    const startTimer = () => {
      if (tick) return;
      tick = setInterval(() => {
        if (!isVisible()) return;
        activeSeconds += 1;
        if (activeSeconds >= 45) fireEngaged();
      }, 1000);
    };
    const stopTimer = () => {
      if (tick) {
        clearInterval(tick);
        tick = null;
      }
    };
    startTimer();

    const onVisibility = () => {
      if (isVisible()) startTimer();
      else stopTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── 60% scroll depth ──
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return; // short page: time-based path will fire
      const depth = (window.scrollY || doc.scrollTop) / scrollable;
      if (depth >= 0.6) fireEngaged();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // in case the page loads already scrolled

    // ── Delegated click tracking for [data-track-event] ──
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-track-event]");
      if (!el) return;
      const event = (el as HTMLElement).dataset.trackEvent;
      if (!event) return;
      sendEvent({ ...base.current, event });
    };
    document.addEventListener("click", onClick);

    function stopEngagedTriggers() {
      stopTimer();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    }

    return () => {
      stopEngagedTriggers();
      document.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, articleSlug]);

  return null;
}
