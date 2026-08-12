"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from "react";
import { FINAL_TICKET_ID, TICKETS, type TicketId } from "@/content";

// The ticket set is intentionally shorter than the original ten-ticket flow.
// Bump the key so an old run cannot leave removed tickets marked as closed.
const KEY = "jessy10.progress.v2";

interface ProgressState {
  closed: TicketId[];
  soundOn: boolean;
}

interface ProgressApi extends ProgressState {
  ready: boolean;
  isClosed: (id: TicketId) => boolean;
  close: (id: TicketId) => void;
  reset: () => void;
  setSound: (on: boolean) => void;
  /** Tickets still open on the board. */
  openCount: number;
  allButFinalClosed: boolean;
}

const Ctx = createContext<ProgressApi | null>(null);

/**
 * Derived from the board, not hardcoded — tickets get added and dropped right
 * up to the day itself, and the gate must follow. BUG-0001 is excluded: it
 * unlocks only once every other ticket is closed.
 */
const NORMAL_TICKETS = TICKETS.filter((t) => t.id !== FINAL_TICKET_ID);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>({ closed: [], soundOn: false });
  const [ready, setReady] = useState(false);

  // Resume exactly where she left off — a call or a dropped tab must not
  // restart the experience in front of an audience.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw) as ProgressState);
    } catch {
      /* private mode, corrupt value — start fresh, never crash */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* quota / private mode — progress just won't persist */
    }
  }, [state, ready]);

  const close = useCallback((id: TicketId) => {
    setState((s) => (s.closed.includes(id) ? s : { ...s, closed: [...s.closed, id] }));
  }, []);

  const reset = useCallback(() => setState({ closed: [], soundOn: false }), []);
  const setSound = useCallback((on: boolean) => setState((s) => ({ ...s, soundOn: on })), []);

  const api = useMemo<ProgressApi>(() => {
    // Ignore ids left in localStorage by an older version of the board.
    const onBoard = TICKETS.filter((t) => state.closed.includes(t.id));
    const normalClosed = onBoard.filter((t) => t.id !== FINAL_TICKET_ID).length;
    return {
      ...state,
      ready,
      isClosed: (id) => state.closed.includes(id),
      close,
      reset,
      setSound,
      openCount: TICKETS.length - onBoard.length,
      allButFinalClosed: normalClosed >= NORMAL_TICKETS.length,
    };
  }, [state, ready, close, reset, setSound]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}

/** Cheap delight, huge payoff on iOS. Silently no-ops where unsupported. */
export function haptic(pattern: number | number[] = 12) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
}
