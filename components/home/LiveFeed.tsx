"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type FeedState = "matched" | "pending" | "flagged";

type FeedRow = {
  id: number;
  time: string;
  channel: string;
  kind: string;
  amount: number;
  state: FeedState;
};

const CHANNELS = ["M-Pesa STK Push", "PayBill", "Customer Payment", "Till Payment"] as const;

const fmtKes = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

function clockNow(): string {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function makeRow(id: number): FeedRow {
  const roll = Math.random();
  const state: FeedState = roll > 0.94 ? "flagged" : roll > 0.82 ? "pending" : "matched";
  return {
    id,
    time: clockNow(),
    channel: "M-Pesa (Daraja)",
    kind: CHANNELS[Math.floor(Math.random() * CHANNELS.length)],
    amount: [300, 750, 1250, 2500, 5000, 8000, 15000][Math.floor(Math.random() * 7)],
    state,
  };
}

const initialRows = (): FeedRow[] => {
  const rows: FeedRow[] = [];
  let id = 0;
  for (let i = 0; i < 6; i += 1) {
    const row = makeRow(id);
    const minutesAgo = new Date(Date.now() - (i + 1) * 5200);
    row.time = [minutesAgo.getHours(), minutesAgo.getMinutes(), minutesAgo.getSeconds()]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
    rows.push(row);
    id += 1;
  }
  return rows;
};

/**
 * Live processing board.
 *
 * This is a simulated operational preview — clearly labelled as one — so the
 * marketing page can show the rhythm of the product without pretending to be
 * connected to a tenant's production traffic. It pauses when the tab is hidden
 * and stills under prefers-reduced-motion.
 */
export function LiveFeed() {
  const [rows, setRows] = useState<FeedRow[]>(initialRows);
  const [throughput, setThroughput] = useState(1284);
  const [matchRate, setMatchRate] = useState(98.67);
  const [anomalies, setAnomalies] = useState(7);
  const idRef = useRef(6);
  const freshRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let alive = document.visibilityState === "visible";
    const onVisibility = () => {
      alive = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const timer = window.setInterval(() => {
      if (!alive) return;
      idRef.current += 1;
      const row = makeRow(idRef.current);
      freshRef.current = row.id;
      setRows((prev) => [row, ...prev].slice(0, 6));
      setThroughput((prev) => Math.max(900, Math.min(1700, prev + Math.round((Math.random() - 0.5) * 60))));
      setMatchRate((prev) => Number(Math.min(99.4, Math.max(97.6, prev + (Math.random() - 0.5) * 0.08)).toFixed(2)));
      setAnomalies((prev) => {
        const drift = Math.random() > 0.88 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.min(12, Math.max(3, prev + drift));
      });
    }, 2600);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const stateLabel = useMemo(
    () => ({ matched: "✓ Matched", pending: "◷ Pending", flagged: "⚑ Flagged" }) as Record<FeedState, string>,
    [],
  );

  return (
    <div className="pg-board">
      <div className="pg-board-head">
        <span className="pg-live-tag">
          <i aria-hidden="true" />
          Live processing
        </span>
        <div className="pg-metric">
          <b className="pg-num">{throughput.toLocaleString("en-KE")}</b>
          <span>Transactions / min</span>
        </div>
        <div className="pg-metric" data-tone="ok">
          <b className="pg-num">{matchRate.toFixed(2)}%</b>
          <span>Match rate</span>
        </div>
        <div className="pg-metric" data-tone="warn">
          <b className="pg-num">{anomalies}</b>
          <span>Anomalies</span>
        </div>
        <span className="pg-board-note">Simulated preview</span>
      </div>
      <div className="pg-feed">
        {rows.map((row) => (
          <div
            className="pg-feed-row pg-num"
            data-fresh={row.id === freshRef.current ? "true" : "false"}
            key={row.id}
          >
            <span className="pg-feed-time">{row.time}</span>
            <span className="pg-feed-channel">{row.kind}</span>
            <span className="pg-feed-amount">KES {fmtKes.format(row.amount)}</span>
            <span className="pg-state" data-state={row.state}>
              <i aria-hidden="true" />
              {stateLabel[row.state]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
