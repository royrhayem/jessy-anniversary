import { TICKETS } from "@/content";

/** Prerender the five tickets — nothing should be server-rendered on the day. */
export function generateStaticParams() {
  return TICKETS.map((t) => ({ id: t.id }));
}

export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
