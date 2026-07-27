"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PLACEHOLDER_IMAGES } from "@/components/Placeholder";
import Placeholder from "@/components/Placeholder";

export default function Landing() {
  const router = useRouter();
  const [cookies, setCookies] = useState(true);
  const [loading, setLoading] = useState(true);

  // The over-long spinner sells the corporate incompetence AND preloads every
  // asset for the whole journey, so the rest of the experience never waits on
  // office wifi. Both jobs, one 3.5s.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3500);
    PLACEHOLDER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <main className="corp min-h-dvh flex flex-col items-center justify-center gap-6 px-6">
        <div
          className="h-10 w-10 rounded-full border-4 border-corp-border border-t-corp-blue animate-spin"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-corp-muted">Connecting to RewardHub™…</p>
      </main>
    );
  }

  return (
    <main className="corp min-h-dvh flex flex-col">
      <header className="bg-linear-to-b from-[#5a6570] to-[#3f4750] px-4 py-3">
        <h1 className="text-white font-bold text-lg tracking-tight">RewardHub™</h1>
        <p className="text-white/70 text-[11px] italic">
          Employee Recognition Portal
        </p>
      </header>

      <div className="flex-1 px-5 py-6 flex flex-col items-center text-center">
        <Placeholder
          src="/corporate-hero.jpg"
          label="Stock photo: four colleagues high-fiving"
          className="w-full aspect-video mb-6 border border-corp-border"
        />

        <p className="text-xs tracking-[0.22em] text-corp-muted">CONGRATULATIONS</p>
        <p className="mt-1 text-2xl font-bold tracking-[0.14em]">VALUED ASSOCIATE</p>
        <p className="mt-3 text-sm text-corp-muted">On 10 Years of Service</p>

        <div className="mt-6 h-px w-24 bg-corp-border" />

        <p className="mt-6 text-sm max-w-xs leading-relaxed">
          Your service award has been processed by the Recognition &amp; Engagement
          team. Please redeem your reward below.
        </p>
      </div>

      {/* Primary action lives in the bottom 40% — one-handed reach. */}
      <div className="px-5 pb-8">
        <button
          onClick={() => router.push("/redeem")}
          className="w-full bg-corp-blue text-white font-bold py-4 corp-shadow active:translate-y-px min-h-12"
        >
          REDEEM YOUR REWARD →
        </button>
        <p className="mt-4 text-[9px] leading-tight text-corp-muted text-center">
          Terms and conditions apply. Reward is non-transferable and has no cash
          value. RewardHub™ is not responsible for feelings arising from the
          redemption process.
        </p>
      </div>

      {/* Two clicks of pure corporate authenticity. */}
      {cookies && (
        <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 border-corp-border p-4 text-xs corp-shadow">
          <p className="mb-3">
            We value your privacy. We use cookies to enhance your recognition
            experience.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCookies(false)}
              className="flex-1 bg-corp-blue text-white py-2.5 font-bold min-h-11"
            >
              ACCEPT ALL
            </button>
            <button
              onClick={() => setCookies(false)}
              className="flex-1 border border-corp-border py-2.5 min-h-11"
            >
              Manage preferences
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
