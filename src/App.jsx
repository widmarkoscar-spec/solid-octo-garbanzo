import { useState, useEffect } from "react";
import { version } from "../package.json";

const COURSES = {
  surahammar: {
    id: "surahammar",
    name: "Surahammars GK",
    subtitle: "Mossfallets parkbana",
    holes: [
      { hole: 1,  par: 4, hcp: 16, name: "Hål 1"  },
      { hole: 2,  par: 3, hcp: 10, name: "Hål 2"  },
      { hole: 3,  par: 4, hcp: 4,  name: "Hål 3"  },
      { hole: 4,  par: 5, hcp: 12, name: "Hål 4"  },
      { hole: 5,  par: 4, hcp: 6,  name: "Hål 5"  },
      { hole: 6,  par: 4, hcp: 14, name: "Hål 6"  },
      { hole: 7,  par: 4, hcp: 2,  name: "Hål 7"  },
      { hole: 8,  par: 5, hcp: 8,  name: "Hål 8"  },
      { hole: 9,  par: 3, hcp: 18, name: "Hål 9"  },
      { hole: 10, par: 4, hcp: 5,  name: "Hål 10" },
      { hole: 11, par: 4, hcp: 15, name: "Hål 11" },
      { hole: 12, par: 3, hcp: 13, name: "Hål 12" },
      { hole: 13, par: 4, hcp: 9,  name: "Hål 13" },
      { hole: 14, par: 5, hcp: 1,  name: "Hål 14" },
      { hole: 15, par: 4, hcp: 7,  name: "Hål 15" },
      { hole: 16, par: 3, hcp: 17, name: "Hål 16" },
      { hole: 17, par: 5, hcp: 3,  name: "Hål 17" },
      { hole: 18, par: 4, hcp: 11, name: "Hål 18" },
    ],
  },
  angso: {
    id: "angso",
    name: "Ängsö GK",
    subtitle: "Skogs- och parkbana vid Mälaren",
    holes: [
      { hole: 1,  par: 4, hcp: 10, name: "Hål 1"  },
      { hole: 2,  par: 4, hcp: 6,  name: "Hål 2"  },
      { hole: 3,  par: 3, hcp: 8,  name: "Hål 3"  },
      { hole: 4,  par: 4, hcp: 2,  name: "Hål 4"  },
      { hole: 5,  par: 5, hcp: 18, name: "Hål 5"  },
      { hole: 6,  par: 4, hcp: 16, name: "Hål 6"  },
      { hole: 7,  par: 5, hcp: 4,  name: "Hål 7"  },
      { hole: 8,  par: 4, hcp: 14, name: "Hål 8"  },
      { hole: 9,  par: 3, hcp: 12, name: "Hål 9"  },
      { hole: 10, par: 5, hcp: 1,  name: "Hål 10" },
      { hole: 11, par: 4, hcp: 17, name: "Hål 11" },
      { hole: 12, par: 3, hcp: 9,  name: "Hål 12" },
      { hole: 13, par: 4, hcp: 5,  name: "Hål 13" },
      { hole: 14, par: 4, hcp: 11, name: "Hål 14" },
      { hole: 15, par: 3, hcp: 7,  name: "Hål 15" },
      { hole: 16, par: 4, hcp: 13, name: "Hål 16" },
      { hole: 17, par: 4, hcp: 3,  name: "Hål 17" },
      { hole: 18, par: 5, hcp: 15, name: "Hål 18" },
    ],
  },
  fullero: {
    id: "fullero",
    name: "Fullerö GK",
    subtitle: "Park- och skogsbana nära Västerås",
    holes: [
      { hole: 1,  par: 5, hcp: 8,  name: "Hål 1"  },
      { hole: 2,  par: 5, hcp: 12, name: "Hål 2"  },
      { hole: 3,  par: 3, hcp: 14, name: "Hål 3"  },
      { hole: 4,  par: 4, hcp: 4,  name: "Hål 4"  },
      { hole: 5,  par: 4, hcp: 16, name: "Hål 5"  },
      { hole: 6,  par: 4, hcp: 2,  name: "Hål 6"  },
      { hole: 7,  par: 3, hcp: 18, name: "Hål 7"  },
      { hole: 8,  par: 4, hcp: 10, name: "Hål 8"  },
      { hole: 9,  par: 4, hcp: 6,  name: "Hål 9"  },
      { hole: 10, par: 4, hcp: 3,  name: "Hål 10" },
      { hole: 11, par: 4, hcp: 7,  name: "Hål 11" },
      { hole: 12, par: 3, hcp: 17, name: "Hål 12" },
      { hole: 13, par: 5, hcp: 11, name: "Hål 13" },
      { hole: 14, par: 4, hcp: 1,  name: "Hål 14" },
      { hole: 15, par: 3, hcp: 15, name: "Hål 15" },
      { hole: 16, par: 4, hcp: 9,  name: "Hål 16" },
      { hole: 17, par: 5, hcp: 13, name: "Hål 17" },
      { hole: 18, par: 4, hcp: 5,  name: "Hål 18" },
    ],
  },
};

const COURSE_LIST = [COURSES.surahammar, COURSES.angso, COURSES.fullero];

const LEVELS = [
  { level: 1,  title: "Golfgrodd",         emoji: "🌱", xpRequired: 0      },
  { level: 2,  title: "Fairway-vandrare",  emoji: "🚶", xpRequired: 2000   },
  { level: 3,  title: "Bagbäraren",        emoji: "🎒", xpRequired: 6000   },
  { level: 4,  title: "Tee-tid-fanatiker", emoji: "☀️", xpRequired: 14000  },
  { level: 5,  title: "Greenläsaren",      emoji: "🌿", xpRequired: 28000  },
  { level: 6,  title: "Fairway-riddaren",  emoji: "🏌️", xpRequired: 50000  },
  { level: 7,  title: "Hålmästaren",       emoji: "⛳", xpRequired: 82000  },
  { level: 8,  title: "Birdiejägaren",     emoji: "🔥", xpRequired: 128000 },
  { level: 9,  title: "Klubblegenden",     emoji: "👑", xpRequired: 192000 },
  { level: 10, title: "Örnen",             emoji: "🦅", xpRequired: 280000 },
];

const STORAGE_KEY = "sgk_rounds";

const DEFAULT_CLUBS = [
  { id: "driver",  cat: "Driver",  label: "Driver",   brand: "", model: "", dist: "", fav: false },
  { id: "3wood",   cat: "Fairway", label: "3-wood",   brand: "", model: "", dist: "", fav: false },
  { id: "5wood",   cat: "Fairway", label: "5-wood",   brand: "", model: "", dist: "", fav: false },
  { id: "7wood",   cat: "Fairway", label: "7-wood",   brand: "", model: "", dist: "", fav: false },
  { id: "hyb3",    cat: "Hybrid",  label: "3-hybrid", brand: "", model: "", dist: "", fav: false },
  { id: "hyb4",    cat: "Hybrid",  label: "4-hybrid", brand: "", model: "", dist: "", fav: false },
  { id: "hyb5",    cat: "Hybrid",  label: "5-hybrid", brand: "", model: "", dist: "", fav: false },
  { id: "iron3",   cat: "Järn",    label: "3-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron4",   cat: "Järn",    label: "4-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron5",   cat: "Järn",    label: "5-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron6",   cat: "Järn",    label: "6-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron7",   cat: "Järn",    label: "7-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron8",   cat: "Järn",    label: "8-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "iron9",   cat: "Järn",    label: "9-järn",   brand: "", model: "", dist: "", fav: false },
  { id: "pw",      cat: "Wedge",   label: "PW",       brand: "", model: "", dist: "", fav: false },
  { id: "gw",      cat: "Wedge",   label: "GW",       brand: "", model: "", dist: "", fav: false },
  { id: "sw",      cat: "Wedge",   label: "SW",       brand: "", model: "", dist: "", fav: false },
  { id: "lw",      cat: "Wedge",   label: "LW",       brand: "", model: "", dist: "", fav: false },
  { id: "putter",  cat: "Putter",  label: "Putter",   brand: "", model: "", dist: "", fav: false },
];

const AVATARS = ["🏌️","⛳","🦅","🔥","👑","🌿","🎯","💪","😎","🏆","🌱","🚶","🎒","☀️","🦁","🐯","🐺","🦊","🧠","⚡"];

const DARK = {
  bgApp:"#030712", bgSecondary:"#0d1117", bgCard:"#0d1117", bgInput:"#161b22",
  bgActive:"#052e16", bgDeep:"#0a0f16", bgBlueMid:"#070d18",
  bgCircle:"#161b22", bgScoreBox:"#0f172a", bgSidebarBtn:"#0a0f16",
  border:"#1e293b", borderStrong:"#334155", borderActive:"#4ade8033",
  textPrimary:"#f8fafc", textSecondary:"#e2e8f0", textMuted:"#94a3b8",
  textDim:"#475569", textFaint:"#334155", textGhost:"#1e293b",
  accent:"#4ade80", accentDark:"#16a34a",
  topbarBg:"#0d1117", topbarBorder:"#1e293b",
  rowActive:"#0b1a10", rowExpand:"#070f07",
};
const LIGHT = {
  bgApp:"#f0f4f0", bgSecondary:"#ffffff", bgCard:"#ffffff", bgInput:"#f8fafc",
  bgActive:"#dcfce7", bgDeep:"#f1f5f9", bgBlueMid:"#f0f7ff",
  bgCircle:"#f1f5f9", bgScoreBox:"#f1f5f9", bgSidebarBtn:"#f1f5f9",
  border:"#e2e8f0", borderStrong:"#cbd5e1", borderActive:"#16a34a55",
  textPrimary:"#0f172a", textSecondary:"#1e293b", textMuted:"#475569",
  textDim:"#64748b", textFaint:"#94a3b8", textGhost:"#cbd5e1",
  accent:"#16a34a", accentDark:"#15803d",
  topbarBg:"#ffffff", topbarBorder:"#e2e8f0",
  rowActive:"#f0fdf4", rowExpand:"#f8fafc",
};

let T = DARK;
let HOLES = COURSES.surahammar.holes; // global, updated by GolfApp

function parseMinGolfText(text) {
  const SKIP = /^(hal|par|index|slag|j\.brutto|poang|out|in|total)/i;
  const lines = text.trim().split("\n").map(l => l.trim()).filter(Boolean);
  const nums = lines.filter(l => !SKIP.test(l)).map(l => parseInt(l)).filter(n => !isNaN(n));
  const scores = {};
  let i = 0, expectedHole = 1;
  while (i < nums.length && expectedHole <= 18) {
    if (nums[i] === expectedHole) {
      if (i + 3 < nums.length) {
        const slag = nums[i + 3];
        if (slag > 0 && slag <= 15) scores[expectedHole] = slag;
      }
      expectedHole++;
      i += 6;
    } else {
      i++;
    }
  }
  return scores;
}

function getResult(score, par) {
  if (!score) return null;
  if (score === 1 && par === 3) return { label: "HIO", color: "#ff69b4", bg: "#1a0012" };
  const diff = score - par;
  const map = {
    "-3": { label: "Albatross", color: "#FFD700", bg: "#1a1200" },
    "-2": { label: "Eagle",    color: "#fbbf24", bg: "#2a1f00" },
    "-1": { label: "Birdie",   color: "#4ade80", bg: "#052e16" },
    "0":  { label: "Par",      color: "#94a3b8", bg: "#1e293b" },
    "1":  { label: "Bogey",    color: "#fb923c", bg: "#1c0d00" },
    "2":  { label: "Dubbel",   color: "#f87171", bg: "#1c0505" },
    "3":  { label: "Trippel",  color: "#ef4444", bg: "#200000" },
  };
  const key = String(Math.max(-3, Math.min(3, diff)));
  return map[key] || { label: "+" + diff, color: "#ef4444", bg: "#200000" };
}

function HoleRow({ holeData, score, putts, onScore, onPutts, onReady, active, onClick }) {
  const result = getResult(score, holeData.par);
  return (
    <div style={{ borderBottom: "1px solid #0f172a" }}>
      <div onClick={onClick} style={{ display: "grid", gridTemplateColumns: "36px 1fr 48px 48px 56px 56px", alignItems: "center", padding: "8px 12px", cursor: "pointer", background: active ? T.rowActive : "transparent", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: active ? T.bgActive : T.bgCircle, border: "2px solid " + (active ? T.accent : T.border), display: "flex", alignItems: "center", justifyContent: "center", color: active ? T.accent : T.textDim, fontSize: 13, fontWeight: 700 }}>
          {holeData.hole}
        </div>
        <div>
          <div style={{ fontSize: 13, color: T.textSecondary, fontWeight: 500 }}>{holeData.name}</div>
          <div style={{ fontSize: 11, color: T.textFaint }}>Par {holeData.par} · HCP {holeData.hcp}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          {result
            ? <span style={{ fontSize: 10, fontWeight: 700, color: result.color, background: result.bg, padding: "2px 6px", borderRadius: 20, border: "1px solid " + result.color + "33", textTransform: "uppercase", whiteSpace: "nowrap" }}>{result.label}</span>
            : <span style={{ color: T.textGhost, fontSize: 11 }}>-</span>
          }
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", width: 34, height: 34, borderRadius: 8, background: score ? T.bgScoreBox : T.bgSidebarBtn, border: "2px solid " + (score ? (result?.color || T.accent) : T.border), alignItems: "center", justifyContent: "center", color: score ? (result?.color || "#fff") : T.textFaint, fontSize: 16, fontWeight: 700 }}>
            {score || "-"}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {putts > 0
            ? <span style={{ fontSize: 13, color: "#60a5fa", fontWeight: 700 }}>{putts}</span>
            : <span style={{ color: T.textGhost, fontSize: 11 }}>-</span>
          }
        </div>
        <div style={{ textAlign: "right", color: active ? T.accent : T.textGhost, fontSize: 14 }}>
          {active ? "▲" : "▼"}
        </div>
      </div>
      {active && (
        <div style={{ padding: "12px 16px 16px", background: T.rowExpand, borderTop: "1px solid " + T.border }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Antal slag</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => onScore(v)} style={{ width: 40, height: 40, borderRadius: "50%", border: score === v ? "2px solid " + T.accent : "2px solid " + T.border, background: score === v ? T.bgActive : T.bgCard, color: score === v ? T.accent : T.textDim, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Antal puttar</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => putts > 0 && onPutts(putts - 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.border, background: T.bgCard, color: T.textMuted, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                <div style={{ width: 40, textAlign: "center", fontSize: 22, fontWeight: 700, color: putts > 0 ? "#60a5fa" : T.textFaint }}>{putts > 0 ? putts : "-"}</div>
                <button onClick={() => putts < 6 && onPutts(putts + 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + T.border, background: T.bgCard, color: T.textMuted, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>
            {score > 0 && putts > 0 && (
              <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
                <button onClick={onReady} style={{ padding: "10px 28px", background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {holeData.hole < 18 ? "Nästa hål →" : "Avsluta ronden ✓"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EditHoleRow({ holeData, score, putts, onScore, onPutts, open, onToggle }) {
  const result = getResult(score, holeData.par);
  return (
    <div style={{ borderBottom: "1px solid #0f172a" }}>
      <div onClick={onToggle} style={{ display: "grid", gridTemplateColumns: "32px 1fr 44px 44px 44px", gap: 8, padding: "8px 12px", cursor: "pointer", background: open ? T.rowActive : "transparent", alignItems: "center" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: open ? T.bgActive : T.bgCircle, border: "2px solid " + (open ? T.accent : T.border), display: "flex", alignItems: "center", justifyContent: "center", color: open ? T.accent : T.textDim, fontSize: 12, fontWeight: 700 }}>{holeData.hole}</div>
        <div>
          <div style={{ fontSize: 12, color: T.textSecondary }}>{holeData.name}</div>
          <div style={{ fontSize: 10, color: T.textFaint }}>Par {holeData.par}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          {result && <span style={{ fontSize: 9, fontWeight: 700, color: result.color, background: result.bg, padding: "1px 5px", borderRadius: 10, border: "1px solid " + result.color + "33", textTransform: "uppercase" }}>{result.label}</span>}
        </div>
        <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: score ? (result ? result.color : "#fff") : T.textFaint }}>{score || "-"}</div>
        <div style={{ textAlign: "center", fontSize: 13, color: putts > 0 ? "#60a5fa" : T.textFaint, fontWeight: 700 }}>{putts > 0 ? putts : "-"}</div>
      </div>
      {open && (
        <div style={{ padding: "10px 14px 14px", background: T.rowExpand, borderTop: "1px solid " + T.border }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 10, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Slag</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {[1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => onScore(v)} style={{ width: 34, height: 34, borderRadius: "50%", border: score === v ? "2px solid " + T.accent : "2px solid " + T.border, background: score === v ? T.bgActive : T.bgCard, color: score === v ? T.accent : T.textDim, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Puttar</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => putts > 0 && onPutts(putts - 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid " + T.border, background: T.bgCard, color: T.textMuted, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                <div style={{ width: 36, textAlign: "center", fontSize: 18, fontWeight: 700, color: putts > 0 ? "#60a5fa" : T.textFaint }}>{putts > 0 ? putts : "-"}</div>
                <button onClick={() => putts < 6 && onPutts(putts + 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid " + T.border, background: T.bgCard, color: T.textMuted, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBar({ label, count, color, pct }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ color: T.textMuted, fontSize: 13 }}>{label}</span>
        <span style={{ color, fontSize: 13, fontWeight: 700 }}>{count}</span>
      </div>
      <div style={{ height: 5, background: T.border, borderRadius: 4 }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function HistoryChart({ rounds }) {
  if (rounds.length === 0) return (
    <div style={{ textAlign: "center", padding: "32px 0", color: T.textFaint, fontSize: 13 }}>Inga avslutade ronder ännu</div>
  );
  const W = 500, H = 160, PL = 44, PR = 16, PT = 16, PB = 28;
  const cW = W - PL - PR, cH = H - PT - PB;
  const sc = rounds.map(r => r.totalScore);
  const minS = Math.min(...sc) - 2, maxS = Math.max(...sc) + 2;
  const range = maxS - minS || 1;
  const toX = i => PL + (i / Math.max(sc.length - 1, 1)) * cW;
  const toY = v => PT + cH - ((v - minS) / range) * cH;
  const pts = sc.map((s, i) => [toX(i), toY(s)]);
  const lp = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const ap = lp + " L" + pts[pts.length-1][0].toFixed(1) + "," + (PT+cH).toFixed(1) + " L" + pts[0][0].toFixed(1) + "," + (PT+cH).toFixed(1) + " Z";
  const grid = [0,1,2,3,4].map(i => ({ val: Math.round(minS + (range/4)*i), y: toY(Math.round(minS + (range/4)*i)) }));
  return (
    <svg viewBox={"0 0 " + W + " " + H} style={{ width: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map(g => (
        <g key={g.val}>
          <line x1={PL} y1={g.y} x2={W-PR} y2={g.y} stroke={T.border} strokeWidth="1" />
          <text x={PL-6} y={g.y+4} textAnchor="end" fontSize="9" fill={T.textDim}>{g.val}</text>
        </g>
      ))}
      {minS <= 72 && 72 <= maxS && (
        <line x1={PL} y1={toY(72)} x2={W-PR} y2={toY(72)} stroke={T.borderStrong} strokeWidth="1" strokeDasharray="4 3" />
      )}
      <path d={ap} fill="url(#ag)" />
      <path d={lp} fill="none" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={4} fill="#4ade80" stroke="#030712" strokeWidth="2" />
          <text x={p[0]} y={p[1]-8} textAnchor="middle" fontSize="9" fill={T.textMuted}>{sc[i]}</text>
        </g>
      ))}
      {pts.map((p, i) => (
        <text key={i} x={p[0]} y={H-4} textAnchor="middle" fontSize="9" fill={T.textDim}>{rounds[i].dateLabel}</text>
      ))}
    </svg>
  );
}

function ResultDonut({ dist }) {
  const CATS = [
    { key: "hio",       label: "HIO",      color: "#ff69b4", val: dist.hio },
    { key: "albatross", label: "Albatross", color: "#FFD700", val: dist.albatross },
    { key: "eagle",     label: "Eagle",     color: "#fbbf24", val: dist.eagle },
    { key: "birdie",    label: "Birdie",    color: "#4ade80", val: dist.birdie },
    { key: "par",       label: "Par",       color: "#94a3b8", val: dist.par },
    { key: "bogey",     label: "Bogey",     color: "#60a5fa", val: dist.bogey },
    { key: "double",    label: "Dubbel",    color: "#fb923c", val: dist.double },
    { key: "worse",     label: "Trippel+",  color: "#ef4444", val: dist.worse },
  ].filter(c => c.val > 0);
  if (CATS.length === 0) return (
    <div style={{ textAlign: "center", padding: "24px 0", color: T.textFaint, fontSize: 13 }}>Registrera resultat för att se fördelning</div>
  );
  const total = CATS.reduce((s, c) => s + c.val, 0);
  const R = 60, ri = 38, cx = 70, cy = 70;
  let angle = -Math.PI / 2;
  const slices = CATS.map(c => {
    const sweep = (c.val / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle);
    angle += sweep;
    const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle);
    const xi1 = cx + ri * Math.cos(angle), yi1 = cy + ri * Math.sin(angle);
    const xi2 = cx + ri * Math.cos(angle - sweep), yi2 = cy + ri * Math.sin(angle - sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const d = "M" + x1.toFixed(2) + "," + y1.toFixed(2) + " A" + R + "," + R + " 0 " + large + ",1 " + x2.toFixed(2) + "," + y2.toFixed(2) + " L" + xi1.toFixed(2) + "," + yi1.toFixed(2) + " A" + ri + "," + ri + " 0 " + large + ",0 " + xi2.toFixed(2) + "," + yi2.toFixed(2) + " Z";
    return { ...c, d };
  });
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        {slices.map(s => <path key={s.key} d={s.d} fill={s.color} opacity="0.9" />)}
        <text x="70" y="66" textAnchor="middle" fontSize="20" fontWeight="900" fill={T.textPrimary} fontFamily="serif">{total}</text>
        <text x="70" y="80" textAnchor="middle" fontSize="10" fill={T.textDim}>hål spelade</text>
      </svg>
      <div style={{ flex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
          {CATS.map(c => (
            <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: T.textMuted }}>{c.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.val}</span>
              <span style={{ fontSize: 12, color: T.textDim, width: 36, textAlign: "right" }}>{Math.round((c.val / total) * 100)}%</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 14, borderTop: "1px solid " + T.border }}>
          {[["Under par", dist.hio + dist.albatross + dist.eagle + dist.birdie, "#4ade80"], ["Par", dist.par, "#94a3b8"], ["Över par", dist.bogey + dist.double + dist.worse, "#f87171"]].map(e => (
            <div key={e[0]} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: e[2] }}>{e[1]}</div>
              <div style={{ fontSize: 11, color: T.textDim }}>{e[0]}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "8px 0", fontSize: 10, color: T.textGhost, letterSpacing: 1, userSelect: "none" }}>
        Slagbok · Skapad av Oscar Widmark
      </div>
    </div>
  );
}

function HoleAvgTable({ rounds }) {
  if (rounds.length === 0) return (
    <div style={{ textAlign: "center", padding: "16px 0", color: T.textFaint, fontSize: 13 }}>Inga sparade ronder ännu</div>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {HOLES.map(hole => {
        const allSc = rounds.map(r => r.scores[hole.hole]).filter(Boolean);
        const avg = allSc.length > 0 ? allSc.reduce((s, v) => s + v, 0) / allSc.length : null;
        const diff = avg !== null ? avg - hole.par : null;
        const diffStr = diff === null ? "-" : diff > 0 ? "+" + diff.toFixed(2) : diff.toFixed(2);
        const diffColor = diff === null ? T.textFaint : diff < 0 ? "#4ade80" : diff > 0 ? "#f87171" : "#94a3b8";
        return (
          <div key={hole.hole} style={{ background: T.bgSidebarBtn, border: "1px solid " + T.border, borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.bgCircle, border: "1px solid " + T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: T.textDim, fontWeight: 700, flexShrink: 0 }}>{hole.hole}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.textFaint }}>Par {hole.par}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.textSecondary }}>{avg !== null ? avg.toFixed(2) : "-"}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: diffColor }}>{diffStr}</div>
          </div>
        );
      })}
    </div>
  );
}

function AddCourseModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [nameError, setNameError] = useState("");
  const defaultHoles = Array.from({ length: 18 }, (_, i) => ({
    hole: i + 1,
    par: 4,
    hcp: i + 1,
    name: "Hål " + (i + 1),
  }));
  const [holes, setHoles] = useState(defaultHoles);
  const [hcpError, setHcpError] = useState("");

  function goToStep2() {
    if (!name.trim()) { setNameError("Banans namn är obligatoriskt."); return; }
    setNameError("");
    setStep(2);
  }

  function setPar(holeIndex, par) {
    setHoles(prev => prev.map((h, i) => i === holeIndex ? { ...h, par } : h));
  }

  function setHcp(holeIndex, val) {
    const num = parseInt(val);
    setHoles(prev => prev.map((h, i) => i === holeIndex ? { ...h, hcp: isNaN(num) ? "" : num } : h));
  }

  function handleSave() {
    const hcpVals = holes.map(h => h.hcp);
    const valid = hcpVals.every(v => typeof v === "number" && v >= 1 && v <= 18);
    const unique = new Set(hcpVals).size === 18;
    if (!valid || !unique) {
      setHcpError("HCP-värdena måste vara unika heltal mellan 1 och 18.");
      return;
    }
    setHcpError("");
    const id = "custom_" + Date.now();
    const course = {
      id,
      name: name.trim(),
      subtitle: subtitle.trim(),
      holes: holes.map(h => ({ ...h, hcp: h.hcp })),
    };
    onSave(course);
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 16, padding: 32, width: 620, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.textPrimary }}>Lägg till egen bana</div>
            <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>Steg {step} av 2</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: T.textDim, fontSize: 20, cursor: "pointer" }}>×</button>
        </div>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Banans namn *</label>
              <input
                placeholder="T.ex. Örebro GK"
                value={name}
                onChange={e => { setName(e.target.value); setNameError(""); }}
                style={{ width: "100%", padding: "10px 12px", background: T.bgInput, border: "1px solid " + (nameError ? "#ef4444" : T.border), borderRadius: 8, color: T.textSecondary, fontSize: 14 }}
              />
              {nameError && <div style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{nameError}</div>}
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Undertitel (valfri)</label>
              <input
                placeholder='T.ex. "Parkbana"'
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textSecondary, fontSize: 14 }}
              />
            </div>
            <button onClick={goToStep2} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Nästa →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr auto 80px", gap: 8, padding: "0 4px", marginBottom: 8 }}>
              {["Hål", "Par", "", "HCP"].map((h, i) => (
                <div key={i} style={{ fontSize: 10, color: T.textFaint, letterSpacing: 1, textTransform: "uppercase", textAlign: i === 3 ? "center" : "left" }}>{h}</div>
              ))}
            </div>
            <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
              {holes.map((hole, i) => (
                <div key={hole.hole} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto 80px", gap: 8, alignItems: "center", padding: "8px 12px", borderBottom: i < 17 ? "1px solid " + T.border : "none", background: i % 2 === 0 ? "transparent" : T.bgDeep }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.bgCircle, border: "1px solid " + T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.textDim, fontWeight: 700 }}>{hole.hole}</div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>{hole.name}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[3, 4, 5].map(p => (
                      <button key={p} onClick={() => setPar(i, p)} style={{ width: 32, height: 28, borderRadius: 6, border: "1px solid " + (hole.par === p ? T.accent : T.border), background: hole.par === p ? T.bgActive : T.bgInput, color: hole.par === p ? T.accent : T.textDim, fontSize: 12, fontWeight: hole.par === p ? 700 : 400, cursor: "pointer" }}>{p}</button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={18}
                    value={hole.hcp}
                    onChange={e => setHcp(i, e.target.value)}
                    style={{ width: "100%", padding: "5px 8px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 6, color: T.textSecondary, fontSize: 13, textAlign: "center" }}
                  />
                </div>
              ))}
            </div>
            {hcpError && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 12, padding: "8px 12px", background: "#1c0505", borderRadius: 8, border: "1px solid #ef444433" }}>{hcpError}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 12, background: "transparent", border: "1px solid " + T.border, borderRadius: 10, color: T.textDim, fontSize: 14, cursor: "pointer" }}>← Tillbaka</button>
              <button onClick={handleSave} style={{ flex: 2, padding: 12, background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Spara bana</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ImportModal({ onClose, onImport, courseId, setCourseId, courseList, coursesMap }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [totalPuttsInput, setTotalPuttsInput] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  function handleParse() {
    setError("");
    const parsed = parseMinGolfText(text);
    if (Object.keys(parsed).length === 0) {
      setError("Kunde inte tolka texten. Klistra in texten direkt från Min Golf scorekort.");
      return;
    }
    setPreview(parsed);
  }

  function handleImport() {
    if (!preview) return;
    const d = new Date(date);
    const dateLabel = d.getDate() + "/" + (d.getMonth() + 1);
    const totalScore = HOLES.reduce((s, h) => s + (preview[h.hole] || 0), 0);
    const importCourse = (coursesMap || COURSES)[courseId] || COURSES.surahammar;
    const parsedPutts = parseInt(totalPuttsInput);
    const totalPutts = !isNaN(parsedPutts) && parsedPutts > 0 ? parsedPutts : 0;
    onImport({ id: Date.now(), date: new Date(date).toISOString(), dateLabel, playerName: "", courseId, courseName: importCourse.name, totalScore, totalPutts, scores: { ...preview }, putts: {} });
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 16, padding: 32, width: 600, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.textPrimary }}>Importera från Min Golf</div>
            <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>Klistra in texten från ditt scorekort på mingolf.golf.se</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: T.textDim, fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16, alignItems: "end" }}>
          <div>
            <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Datum</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", padding: "10px 12px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textSecondary, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Puttar <span style={{ textTransform: "none", opacity: 0.6 }}>(valfritt)</span></label>
            <input type="number" min="0" max="99" placeholder="t.ex. 32" value={totalPuttsInput} onChange={e => setTotalPuttsInput(e.target.value)} style={{ width: "100%", padding: "10px 12px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textSecondary, fontSize: 14, boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Bana</label>
          <div style={{ display: "flex", gap: 6 }}>
            {(courseList || COURSE_LIST).map(course => (
              <button key={course.id} onClick={() => setCourseId(course.id)} style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: "2px solid " + (courseId === course.id ? T.accent : T.border), background: courseId === course.id ? T.bgActive : T.bgInput, color: courseId === course.id ? T.accent : T.textSecondary, fontSize: 11, fontWeight: courseId === course.id ? 700 : 400, cursor: "pointer", textAlign: "center" }}>
                {course.name}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: T.textDim, display: "block", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Klistra in text från Min Golf</label>
          <textarea value={text} onChange={e => { setText(e.target.value); setPreview(null); setError(""); }} style={{ width: "100%", height: 160, padding: "10px 12px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textSecondary, fontSize: 13, fontFamily: "monospace", resize: "vertical" }} />
        </div>
        {error && (
          <div style={{ color: "#f87171", fontSize: 13, marginBottom: 12, padding: "8px 12px", background: "#1c0505", borderRadius: 8, border: "1px solid #ef444433" }}>{error}</div>
        )}
        {!preview ? (
          <button onClick={handleParse} style={{ width: "100%", padding: 12, background: T.bgDeep, border: "1px solid " + T.border, borderRadius: 10, color: T.textSecondary, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Tolka text</button>
        ) : (
          <div>
            <div style={{ marginBottom: 16, padding: "12px 16px", background: "#052e16", border: "1px solid #4ade8033", borderRadius: 10 }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 8 }}>Hittade {Object.keys(preview).length} hål — granska nedan</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 4 }}>
                {HOLES.map(hole => {
                  const sc = preview[hole.hole];
                  const res = getResult(sc, hole.par);
                  return (
                    <div key={hole.hole} style={{ textAlign: "center", background: sc ? res?.bg : T.bgCircle, borderRadius: 6, padding: "6px 4px", border: "1px solid " + (sc ? res?.color + "44" : T.border) }}>
                      <div style={{ fontSize: 9, color: T.textDim }}>Hål {hole.hole}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: sc ? res?.color : T.textFaint }}>{sc || "-"}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: T.textMuted }}>
                Total score: <strong style={{ color: T.textPrimary }}>{HOLES.reduce((s, h) => s + (preview[h.hole] || 0), 0)}</strong>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setPreview(null)} style={{ flex: 1, padding: 12, background: "transparent", border: "1px solid " + T.border, borderRadius: 10, color: T.textDim, fontSize: 14, cursor: "pointer" }}>Ändra</button>
              <button onClick={handleImport} style={{ flex: 2, padding: 12, background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Importera rond</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RecordsView({ records, T, darkMode }) {
  if (records === null) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
        <div style={{ color: T.textFaint, fontSize: 15 }}>Spela din första rond för att se dina rekord!</div>
      </div>
    );
  }

  const items = [
    {
      icon: "🏌️",
      title: "Bästa ronden",
      value: records.bestRound !== null ? records.bestRound.totalScore : null,
      sub: records.bestRound ? records.bestRound.dateLabel + (records.bestRound.courseName ? " · " + records.bestRound.courseName : "") : null,
      unit: "slag",
    },
    {
      icon: "🐦",
      title: "Flest birdies på en runda",
      value: records.mostBirdies !== null ? records.mostBirdies.count : null,
      sub: records.mostBirdies ? records.mostBirdies.dateLabel + (records.mostBirdies.courseName ? " · " + records.mostBirdies.courseName : "") : null,
      unit: "birdies",
    },
    {
      icon: "⛳",
      title: "Bästa enskilda hål",
      value: records.bestHole !== null ? records.bestHole.label : null,
      sub: records.bestHole ? "Hål " + records.bestHole.hole + " · " + records.bestHole.dateLabel + (records.bestHole.courseName ? " · " + records.bestHole.courseName : "") : null,
      unit: null,
    },
    {
      icon: "🎯",
      title: "Bästa Front 9",
      value: records.bestFront9 !== null ? records.bestFront9.score : null,
      sub: records.bestFront9 ? records.bestFront9.dateLabel + (records.bestFront9.courseName ? " · " + records.bestFront9.courseName : "") : null,
      unit: "slag",
    },
    {
      icon: "🎯",
      title: "Bästa Back 9",
      value: records.bestBack9 !== null ? records.bestBack9.score : null,
      sub: records.bestBack9 ? records.bestBack9.dateLabel + (records.bestBack9.courseName ? " · " + records.bestBack9.courseName : "") : null,
      unit: "slag",
    },
    {
      icon: "🔥",
      title: "Flest par eller bättre på en runda",
      value: records.mostParOrBetter !== null ? records.mostParOrBetter.count : null,
      sub: records.mostParOrBetter ? records.mostParOrBetter.dateLabel + (records.mostParOrBetter.courseName ? " · " + records.mostParOrBetter.courseName : "") : null,
      unit: "hål",
    },
  ];

  return (
    <div style={{ padding: "24px 32px" }}>

      {/* Nivåkort — överst */}
      {(() => {
        const lvl = records.currentLevel;
        const nxt = records.nextLevel;
        const xpInto = records.xpIntoLevel;
        const xpRange = nxt ? nxt.xpRequired - lvl.xpRequired : 1;
        const pct = nxt ? Math.min(100, Math.round((xpInto / xpRange) * 100)) : 100;
        const bd = records.xpBreakdown;
        return (
          <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 14, padding: "24px 28px", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 40, lineHeight: 1 }}>{lvl.emoji}</div>
              <div>
                <div style={{ fontSize: 13, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>Nivå {lvl.level}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: T.textPrimary, lineHeight: 1.1 }}>{lvl.title}</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: T.accent, lineHeight: 1 }}>{records.totalXP.toLocaleString("sv-SE")}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>total XP</div>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 12, background: T.border, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: 99, transition: "width 0.5s ease" }} />
              </div>
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 16 }}>
              {nxt
                ? records.xpNeededForNext.toLocaleString("sv-SE") + " XP till " + nxt.emoji + " " + nxt.title
                : "MAX LEVEL"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, paddingTop: 14, borderTop: "1px solid " + T.border }}>
              {[
                ["Rundor",       bd.xpRounds,       "#4ade80"],
                ["Resultat",     bd.xpResults,      "#fbbf24"],
                ["Puttar",       bd.xpPutts,        "#60a5fa"],
                ["Streaks",      bd.xpStreaks,       "#f97316"],
                ["Achievements", bd.xpAchievements, "#a78bfa"],
              ].map(([label, val, color]) => (
                <div key={label} style={{ textAlign: "center", background: T.bgDeep, borderRadius: 8, padding: "8px 4px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color }}>{val.toLocaleString("sv-SE")} <span style={{ fontSize: 10 }}>XP</span></div>
                  <div style={{ fontSize: 10, color: T.textDim, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: T.textPrimary }}>Personliga rekord</div>
        <div style={{ fontSize: 13, color: T.textFaint, marginTop: 2 }}>Baserat på alla sparade ronder</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: item.value !== null ? T.accent : T.textGhost, lineHeight: 1, marginBottom: 6 }}>
              {item.value !== null ? item.value : "—"}
              {item.value !== null && item.unit && <span style={{ fontSize: 14, fontWeight: 400, color: T.textDim, marginLeft: 6 }}>{item.unit}</span>}
            </div>
            {item.sub && item.value !== null && (
              <div style={{ fontSize: 12, color: T.textFaint, marginTop: 4 }}>{item.sub}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Aktivitet</div>
        <div style={{ flex: 1, height: 1, background: T.border }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            icon: "🔥",
            title: "Nuvarande streak",
            value: records.currentStreak,
            unit: "veckor",
            streakActive: records.currentStreak >= 2,
          },
          {
            icon: "⚡",
            title: "Längsta streak någonsin",
            value: records.longestStreak,
            unit: "veckor",
            streakActive: false,
          },
          {
            icon: "📅",
            title: "Rundor denna månad",
            value: records.roundsThisMonth,
            unit: "rundor",
            streakActive: false,
          },
          {
            icon: "📆",
            title: "Rundor detta år",
            value: records.roundsThisYear,
            unit: "rundor",
            streakActive: false,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, marginBottom: 6, color: item.streakActive ? "#f97316" : (item.value > 0 ? T.accent : T.textGhost) }}>
              {item.value}
              <span style={{ fontSize: 14, fontWeight: 400, color: T.textDim, marginLeft: 6 }}>{item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {records.achievements && (() => {
        const unlockedCount = records.achievements.filter(a => a.unlocked).length;
        return (
          <>
            <div style={{ marginTop: 32, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>
                Achievements ({unlockedCount}/{records.achievements.length})
              </div>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {records.achievements.map(a => (
                <div key={a.id} style={{
                  background: a.unlocked ? T.bgActive : T.bgDeep,
                  border: "1px solid " + (a.unlocked ? T.borderActive : T.border),
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}>
                  <div style={{ fontSize: 28, opacity: a.unlocked ? 1 : 0.3, lineHeight: 1, marginBottom: 2 }}>{a.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.unlocked ? T.accent : T.textFaint, opacity: a.unlocked ? 1 : 0.4, lineHeight: 1.2 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: T.textDim, opacity: a.unlocked ? 1 : 0.4, lineHeight: 1.3 }}>{a.description}</div>
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </div>
  );
}

function BagView({ profile, onProfileChange, bag, onBagChange, goals, onGoalsChange, rounds, allCourseList }) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [editingClub, setEditingClub] = useState(null);

  const clubs = bag.clubs || DEFAULT_CLUBS;
  const ball  = bag.ball  || { brand: "", model: "" };

  const updateClub = (id, field, value) => {
    const updated = clubs.map(c => c.id === id ? { ...c, [field]: value } : c);
    onBagChange({ ...bag, clubs: updated });
  };
  const toggleFav = (id) => {
    const updated = clubs.map(c => ({ ...c, fav: c.id === id ? !c.fav : false }));
    onBagChange({ ...bag, clubs: updated });
  };

  const CAT_ORDER  = ["Driver", "Fairway", "Hybrid", "Järn", "Wedge", "Putter"];
  const catEmojis  = { Driver: "🏌️", Fairway: "🪵", Hybrid: "🔀", Järn: "⛏️", Wedge: "🔧", Putter: "🎯" };

  // Stats from rounds
  const parStats   = { 3: { total: 0, count: 0 }, 4: { total: 0, count: 0 }, 5: { total: 0, count: 0 } };
  const holeAvgs   = {};
  rounds.forEach(r => {
    HOLES.forEach(h => {
      const s = r.scores[h.hole]; if (!s) return;
      if (parStats[h.par]) { parStats[h.par].total += s; parStats[h.par].count++; }
      if (!holeAvgs[h.hole]) holeAvgs[h.hole] = { total: 0, count: 0, par: h.par };
      holeAvgs[h.hole].total += s; holeAvgs[h.hole].count++;
    });
  });
  const holeList   = Object.entries(holeAvgs).map(([hole, d]) => ({ hole: parseInt(hole), avg: d.total / d.count, par: d.par, diff: d.total / d.count - d.par }));
  const bestHole   = holeList.length ? [...holeList].sort((a, b) => a.diff - b.diff)[0] : null;
  const worstHole  = holeList.length ? [...holeList].sort((a, b) => b.diff - a.diff)[0] : null;

  // Goals progress
  const completedRounds = rounds.filter(r => r.totalScore > 0);
  const bestScore       = completedRounds.length > 0 ? Math.min(...completedRounds.map(r => r.totalScore)) : null;
  const scoreGoalNum    = parseInt(goals.scoreGoal);
  const hcpGoalNum      = parseFloat(goals.hcpGoal);
  const hcpNum          = parseFloat(profile.handicap);
  const scoreGoalMet    = bestScore !== null && !isNaN(scoreGoalNum) && bestScore <= scoreGoalNum;
  const hcpGoalMet      = !isNaN(hcpGoalNum) && !isNaN(hcpNum) && hcpNum <= hcpGoalNum;
  const scoreBarPct     = scoreGoalMet ? 100 : (bestScore && !isNaN(scoreGoalNum)) ? Math.min(100, Math.max(5, Math.round((1 - (bestScore - scoreGoalNum) / 20) * 100))) : 5;
  const hcpBarPct       = hcpGoalMet   ? 100 : (!isNaN(hcpGoalNum) && !isNaN(hcpNum)) ? Math.min(100, Math.max(5, Math.round((1 - (hcpNum - hcpGoalNum) / Math.max(1, hcpNum)) * 100))) : 5;

  const inp = { background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textPrimary, fontSize: 13, padding: "8px 12px", outline: "none", width: "100%", boxSizing: "border-box" };
  const sec = (emoji, title) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, marginTop: 32 }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>{title}</div>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );

  return (
    <div style={{ padding: "24px 32px", maxWidth: 900 }}>

      {/* ── Profil ── */}
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Top row: avatar + fields */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div onClick={() => setShowAvatarPicker(v => !v)} style={{ width: 80, height: 80, borderRadius: "50%", background: T.bgActive, border: "2px solid " + (showAvatarPicker ? T.accent : T.border), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, cursor: "pointer", userSelect: "none", transition: "border-color 0.2s" }}>
              {profile.avatar || "🏌️"}
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: T.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#030712", pointerEvents: "none" }}>✎</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, flex: 1 }}>
            <div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Namn</div>
              <input style={inp} value={profile.name || ""} onChange={e => onProfileChange({ ...profile, name: e.target.value })} placeholder="Ditt namn" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Handicap</div>
              <input style={inp} value={profile.handicap || ""} onChange={e => onProfileChange({ ...profile, handicap: e.target.value })} placeholder="t.ex. 24.5" type="number" step="0.1" />
            </div>
            <div>
              <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Hemmabana</div>
              <select style={{ ...inp, cursor: "pointer" }} value={profile.homeCourse || ""} onChange={e => onProfileChange({ ...profile, homeCourse: e.target.value })}>
                <option value="">Välj bana</option>
                {allCourseList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Inline emoji picker */}
        {showAvatarPicker && (
          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 16 }}>
            <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Välj avatar</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {AVATARS.map(av => (
                <button key={av} onClick={() => { onProfileChange({ ...profile, avatar: av }); setShowAvatarPicker(false); }} style={{ fontSize: 26, padding: "6px 8px", border: profile.avatar === av ? "2px solid " + T.accent : "2px solid transparent", borderRadius: 10, background: profile.avatar === av ? T.bgActive : "transparent", cursor: "pointer" }}>{av}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Boll ── */}
      {sec("⛳", "Boll")}
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Märke</div>
            <input style={inp} value={ball.brand || ""} onChange={e => onBagChange({ ...bag, ball: { ...ball, brand: e.target.value } })} placeholder="t.ex. Titleist" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: T.textDim, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>Modell</div>
            <input style={inp} value={ball.model || ""} onChange={e => onBagChange({ ...bag, ball: { ...ball, model: e.target.value } })} placeholder="t.ex. Pro V1" />
          </div>
        </div>
      </div>

      {/* ── Bag / Klubbor ── */}
      {sec("🎒", "Bag")}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CAT_ORDER.map(cat => {
          const catClubs = clubs.filter(c => c.cat === cat);
          return (
            <div key={cat} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid " + T.border, background: T.bgDeep, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{catEmojis[cat]}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1, textTransform: "uppercase" }}>{cat}</span>
              </div>
              {catClubs.map((club, idx) => (
                <div key={club.id} style={{ padding: "11px 16px", borderBottom: idx < catClubs.length - 1 ? "1px solid " + T.border : "none", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 68, fontSize: 13, fontWeight: 600, color: T.textMuted, flexShrink: 0 }}>{club.label}</div>
                  <button onClick={() => toggleFav(club.id)} title="Favoritklubb" style={{ fontSize: 15, background: "transparent", border: "none", cursor: "pointer", color: club.fav ? "#fbbf24" : T.textGhost, padding: "0 2px", flexShrink: 0, lineHeight: 1 }}>★</button>
                  {editingClub === club.id ? (
                    <>
                      <input style={{ ...inp, flex: 1 }} value={club.brand} onChange={e => updateClub(club.id, "brand", e.target.value)} placeholder="Märke (t.ex. Titleist)" />
                      <input style={{ ...inp, flex: 1 }} value={club.model} onChange={e => updateClub(club.id, "model", e.target.value)} placeholder="Modell (t.ex. T100)" />
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                        <input style={{ ...inp, width: 72 }} value={club.dist} onChange={e => updateClub(club.id, "dist", e.target.value)} placeholder="m" type="number" />
                        <span style={{ fontSize: 11, color: T.textFaint, whiteSpace: "nowrap" }}>m</span>
                      </div>
                      <button onClick={() => setEditingClub(null)} style={{ padding: "6px 14px", background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 8, color: "#030712", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Klar</button>
                    </>
                  ) : (
                    <>
                      <div style={{ flex: 1, fontSize: 13, color: (club.brand || club.model) ? T.textSecondary : T.textGhost }}>
                        {(club.brand || club.model) ? [club.brand, club.model].filter(Boolean).join(" ") : "Lägg till info..."}
                      </div>
                      {club.dist && <div style={{ fontSize: 13, color: T.accent, fontWeight: 700, marginRight: 4 }}>{club.dist} m</div>}
                      <button onClick={() => setEditingClub(club.id)} style={{ padding: "5px 12px", background: "transparent", border: "1px solid " + T.border, borderRadius: 8, color: T.textDim, fontSize: 12, cursor: "pointer", flexShrink: 0 }}>Redigera</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* ── Säsongsmål ── */}
      {sec("🎯", "Säsongsmål")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary, marginBottom: 4 }}>🏌️ Scoringmål</div>
          <div style={{ fontSize: 11, color: T.textFaint, marginBottom: 14 }}>Bästa runda du vill uppnå i år</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: T.textDim }}>Under</span>
            <input style={{ ...inp, width: 80 }} value={goals.scoreGoal || ""} onChange={e => onGoalsChange({ ...goals, scoreGoal: e.target.value })} placeholder="85" type="number" />
            <span style={{ fontSize: 13, color: T.textDim }}>slag</span>
          </div>
          {goals.scoreGoal && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.textFaint }}>Bästa runda: {bestScore ?? "-"}</span>
                <span style={{ fontSize: 12, color: scoreGoalMet ? "#4ade80" : T.textDim }}>{scoreGoalMet ? "✓ Uppnått!" : "Mål: " + goals.scoreGoal}</span>
              </div>
              <div style={{ height: 8, background: T.border, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: scoreBarPct + "%", background: scoreGoalMet ? "linear-gradient(90deg,#16a34a,#4ade80)" : "linear-gradient(90deg,#ea580c,#fb923c)", borderRadius: 99, transition: "width 0.4s" }} />
              </div>
            </div>
          )}
        </div>
        <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary, marginBottom: 4 }}>📉 Handicap-mål</div>
          <div style={{ fontSize: 11, color: T.textFaint, marginBottom: 14 }}>Handicap du vill uppnå i år</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: T.textDim }}>HCP</span>
            <input style={{ ...inp, width: 80 }} value={goals.hcpGoal || ""} onChange={e => onGoalsChange({ ...goals, hcpGoal: e.target.value })} placeholder="18.0" type="number" step="0.1" />
          </div>
          {goals.hcpGoal && profile.handicap && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.textFaint }}>Aktuell HCP: {profile.handicap}</span>
                <span style={{ fontSize: 12, color: hcpGoalMet ? "#4ade80" : T.textDim }}>{hcpGoalMet ? "✓ Uppnått!" : "Mål: " + goals.hcpGoal}</span>
              </div>
              <div style={{ height: 8, background: T.border, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: hcpBarPct + "%", background: hcpGoalMet ? "linear-gradient(90deg,#16a34a,#4ade80)" : "linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius: 99, transition: "width 0.4s" }} />
              </div>
            </div>
          )}
          {goals.hcpGoal && !profile.handicap && (
            <div style={{ fontSize: 12, color: T.textFaint }}>Ange din aktuella handicap i profilen ovan</div>
          )}
        </div>
      </div>

      {/* ── Spelstatistik per par-typ ── */}
      {rounds.length > 0 && (
        <>
          {sec("📊", "Spelstatistik per par-typ")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[3, 4, 5].map(par => {
              const st   = parStats[par];
              const avg  = st.count > 0 ? (st.total / st.count).toFixed(2) : null;
              const diff = avg !== null ? (parseFloat(avg) - par) : null;
              const col  = diff === null ? T.textGhost : diff < 0 ? "#4ade80" : diff > 0 ? "#f87171" : "#94a3b8";
              return (
                <div key={par} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Par {par}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, color: avg ? col : T.textGhost }}>{avg ?? "-"}</div>
                  <div style={{ fontSize: 13, color: col, marginTop: 6 }}>{diff !== null ? (diff > 0 ? "+" : "") + diff.toFixed(2) + " mot par" : ""}</div>
                  <div style={{ fontSize: 11, color: T.textFaint, marginTop: 4 }}>{st.count} hål spelade</div>
                </div>
              );
            })}
          </div>
          {bestHole && worstHole && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { h: bestHole,  label: "Bästa hål",    col: "#4ade80", bg: T.bgActive, brd: T.accent },
                { h: worstHole, label: "Svåraste hål",  col: "#f87171", bg: "#200000",  brd: "#f87171" },
              ].map(({ h, label, col, bg, brd }) => (
                <div key={label} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: bg, border: "2px solid " + brd, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: col, flexShrink: 0 }}>{h.hole}</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: col }}>{h.avg.toFixed(2)} <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 400 }}>snitt</span></div>
                    <div style={{ fontSize: 12, color: col }}>{h.diff > 0 ? "+" : ""}{h.diff.toFixed(2)} mot par {h.par}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
}

function DeleteRoundButton({ onDelete }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#f87171", whiteSpace: "nowrap" }}>Är du säker?</span>
        <button onClick={() => { onDelete(); setConfirming(false); }} style={{ padding: "6px 12px", background: "#200000", border: "1px solid #ef444455", borderRadius: 8, color: "#f87171", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Ja, ta bort</button>
        <button onClick={() => setConfirming(false)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid " + T.border, borderRadius: 8, color: T.textDim, fontSize: 12, cursor: "pointer" }}>Avbryt</button>
      </div>
    );
  }
  return (
    <button onClick={() => setConfirming(true)} style={{ padding: "8px 14px", background: "transparent", border: "1px solid " + T.border, borderRadius: 8, color: T.textFaint, fontSize: 13, cursor: "pointer" }}>Ta bort</button>
  );
}

export default function GolfApp() {
  const [scores, setScores]         = useState({});
  const [putts, setPutts]           = useState({});
  const [activeHole, setActiveHole] = useState(1);
  const [view, setView]             = useState("scorecard");
  const [playerName, setPlayerName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [rounds, setRounds]         = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [darkMode, setDarkMode]     = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [editingRound, setEditingRound] = useState(null);
  const [editScores, setEditScores] = useState({});
  const [editPutts, setEditPutts]   = useState({});
  const [editOpenHole, setEditOpenHole] = useState(null);
  const [statsYear, setStatsYear]   = useState("all");
  const [statsCourse, setStatsCourse] = useState("all");
  const [putt10, setPutt10]           = useState(false);
  const [gir10, setGir10]             = useState(false);
  const [hist10, setHist10]           = useState(false);
  const [avg10, setAvg10]             = useState(false);
  const [courseId, setCourseId]     = useState("surahammar");
  const [updateMsg, setUpdateMsg] = useState(null);
  const [customCourses, setCustomCourses] = useState([]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [profile, setProfile] = useState({ name: "", handicap: "", homeCourse: "", avatar: "🏌️" });
  const [bag, setBag]         = useState({ clubs: DEFAULT_CLUBS, ball: { brand: "", model: "" } });
  const [goals, setGoals]     = useState({ scoreGoal: "", hcpGoal: "" });

  T = darkMode ? DARK : LIGHT;
  const allCoursesMap = { ...COURSES, ...Object.fromEntries(customCourses.map(c => [c.id, c])) };
  const allCourseList = [...COURSE_LIST, ...customCourses];
  const COURSE = allCoursesMap[courseId] || COURSES.surahammar;
  HOLES = COURSE.holes; // update global

  useEffect(() => {
    const loadData = async () => {
      try {
        const s = window.electronAPI?.store;
        if (s) {
          const saved  = await s.get("rounds");
          if (saved)   setRounds(saved);
          const theme  = await s.get("theme");
          if (theme !== undefined) setDarkMode(theme !== "light");
          const course = await s.get("course");
          if (course)  setCourseId(course);
          const customC = await s.get("customCourses");
          if (customC) setCustomCourses(customC);
          const prof = await s.get("profile");
          if (prof)   setProfile(prof);
          const savedBag = await s.get("bag");
          if (savedBag) setBag(savedBag);
          const savedGoals = await s.get("goals");
          if (savedGoals) setGoals(savedGoals);
        }
      } catch {}
      setStorageReady(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try { window.electronAPI?.store.set("rounds", rounds); } catch {}
  }, [rounds, storageReady]);

  useEffect(() => {
    try { window.electronAPI?.store.set("theme", darkMode ? "dark" : "light"); } catch {}
  }, [darkMode]);

  useEffect(() => {
    try { window.electronAPI?.store.set("course", courseId); } catch {}
  }, [courseId]);

  useEffect(() => {
    if (!storageReady) return;
    try { window.electronAPI?.store.set("profile", profile); } catch {}
  }, [profile, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try { window.electronAPI?.store.set("bag", bag); } catch {}
  }, [bag, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try { window.electronAPI?.store.set("goals", goals); } catch {}
  }, [goals, storageReady]);

  useEffect(() => {
    window.electronAPI?.onUpdateStatus((msg) => setUpdateMsg(msg));
  }, []);

  const saveRounds = (updated) => {
    setRounds(updated);
    try { window.electronAPI?.store.set("rounds", updated); } catch {}
  };

  const front9  = HOLES.slice(0, 9);
  const back9   = HOLES.slice(9);
  const playedHoles = Object.keys(scores).length;
  const totalScore  = HOLES.reduce((s, h) => s + (scores[h.hole] || 0), 0);
  const totalPar    = HOLES.reduce((s, h) => scores[h.hole] ? s + h.par : s, 0);
  const scoreToPar  = totalScore - totalPar;
  const totalPutts  = Object.values(putts).reduce((s, p) => s + p, 0);
  const f9Score = front9.reduce((s, h) => s + (scores[h.hole] || 0), 0);
  const b9Score = back9.reduce((s, h)  => s + (scores[h.hole] || 0), 0);
  const f9Par   = front9.reduce((s, h) => s + h.par, 0);
  const b9Par   = back9.reduce((s, h)  => s + h.par, 0);
  const f9Putts = front9.reduce((s, h) => s + (putts[h.hole] || 0), 0);
  const b9Putts = back9.reduce((s, h)  => s + (putts[h.hole] || 0), 0);
  const scoreColor = scoreToPar < 0 ? "#4ade80" : scoreToPar > 0 ? "#f87171" : "#94a3b8";
  const scoreLabel = scoreToPar > 0 ? "+" + scoreToPar : scoreToPar !== 0 ? String(scoreToPar) : "E";

  const availableYears = [...new Set(rounds.map(r => new Date(r.date).getFullYear()))].sort((a, b) => b - a);
  const filteredRounds = rounds.filter(r => {
    const yearMatch   = statsYear === "all" || new Date(r.date).getFullYear() === parseInt(statsYear);
    const courseMatch = statsCourse === "all" || (r.courseId || "surahammar") === statsCourse;
    return yearMatch && courseMatch;
  });

  const dist = { hio: 0, albatross: 0, eagle: 0, birdie: 0, par: 0, bogey: 0, double: 0, worse: 0 };
  // 10 senaste ronder inom filtret
  const last10Rounds = filteredRounds.slice(-10);

  filteredRounds.forEach(round => {
    HOLES.forEach(h => {
      const s = round.scores[h.hole]; if (!s) return;
      if (s === 1 && h.par === 3) { dist.hio++; return; }
      const d = s - h.par;
      if (d <= -3) dist.albatross++;
      else if (d === -2) dist.eagle++;
      else if (d === -1) dist.birdie++;
      else if (d === 0)  dist.par++;
      else if (d === 1)  dist.bogey++;
      else if (d === 2)  dist.double++;
      else               dist.worse++;
    });
  });

  const allPuttVals    = filteredRounds.flatMap(r => Object.values(r.putts || {})).filter(p => p > 0);
  const holesWithPutts = allPuttVals.length;
  const allTotalPutts  = allPuttVals.reduce((s, p) => s + p, 0);
  const avgPutts       = holesWithPutts > 0 ? (allTotalPutts / holesWithPutts).toFixed(1) : "-";
  const avgPuttsPerRound = filteredRounds.length > 0
    ? (filteredRounds.reduce((s, r) => s + Object.values(r.putts || {}).reduce((a, p) => a + p, 0), 0) / filteredRounds.length).toFixed(1)
    : "-";
  const oneP   = allPuttVals.filter(p => p === 1).length;
  const twoP   = allPuttVals.filter(p => p === 2).length;
  const threeP = allPuttVals.filter(p => p >= 3).length;

  let girHoles = 0, girTotal = 0;
  filteredRounds.forEach(round => {
    HOLES.forEach(h => {
      const s = round.scores[h.hole];
      const p = (round.putts || {})[h.hole];
      if (!s || !p) return;
      girTotal++;
      if ((s - p) <= (h.par - 2)) girHoles++;
    });
  });
  const girPct = girTotal > 0 ? Math.round((girHoles / girTotal) * 100) : null;

  const n = filteredRounds.length || 1;
  const allF9Score    = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + HOLES.slice(0,9).reduce((a, h) => a + (r.scores[h.hole] || 0), 0), 0) / n).toFixed(1) : 0;
  const allB9Score    = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + HOLES.slice(9).reduce((a, h) => a + (r.scores[h.hole] || 0), 0), 0) / n).toFixed(1) : 0;
  const allF9Par      = HOLES.slice(0,9).reduce((s, h) => s + h.par, 0);
  const allB9Par      = HOLES.slice(9).reduce((s, h) => s + h.par, 0);
  const allF9Putts    = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + HOLES.slice(0,9).reduce((a, h) => a + ((r.putts||{})[h.hole] || 0), 0), 0) / n).toFixed(1) : 0;
  const allB9Putts    = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + HOLES.slice(9).reduce((a, h) => a + ((r.putts||{})[h.hole] || 0), 0), 0) / n).toFixed(1) : 0;
  const allTotalScore = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + r.totalScore, 0) / n).toFixed(1) : 0;
  // Par per round can vary by course — sum actual pars
  const allTotalPar = HOLES.reduce((s, h) => s + h.par, 0);
  const allRoundsPutts = filteredRounds.length > 0 ? +(filteredRounds.reduce((s, r) => s + (r.totalPutts || 0), 0) / n).toFixed(1) : 0;

  // --- Records calculations ---
  let records = null;
  if (rounds.length > 0) {
    // 1. Best round (lowest totalScore)
    let bestRound = null;
    rounds.forEach(r => {
      if (bestRound === null || r.totalScore < bestRound.totalScore) bestRound = r;
    });

    // 2. Most birdies in a single round
    let mostBirdies = null;
    rounds.forEach(r => {
      let count = 0;
      HOLES.forEach(h => {
        const s = r.scores[h.hole];
        if (s && s <= h.par - 1) count++;
      });
      if (mostBirdies === null || count > mostBirdies.count) {
        mostBirdies = { count, dateLabel: r.dateLabel, courseName: r.courseName };
      }
    });

    // 3. Best single hole relative to par
    let bestHole = null;
    const holeResultOrder = ["HIO", "Albatross", "Eagle", "Birdie", "Par", "Bogey", "Dubbel", "Trippel"];
    rounds.forEach(r => {
      HOLES.forEach(h => {
        const s = r.scores[h.hole];
        if (!s) return;
        const res = getResult(s, h.par);
        if (!res) return;
        if (bestHole === null) {
          bestHole = { hole: h.hole, label: res.label, color: res.color, diff: s - h.par, dateLabel: r.dateLabel, courseName: r.courseName };
        } else {
          const newIdx = holeResultOrder.indexOf(res.label);
          const curIdx = holeResultOrder.indexOf(bestHole.label);
          const newDiff = s - h.par;
          if (newIdx < curIdx || (newIdx === curIdx && newDiff < bestHole.diff)) {
            bestHole = { hole: h.hole, label: res.label, color: res.color, diff: newDiff, dateLabel: r.dateLabel, courseName: r.courseName };
          }
        }
      });
    });

    // 4. Best Front 9 (hål 1-9)
    let bestFront9 = null;
    rounds.forEach(r => {
      const score = HOLES.slice(0, 9).reduce((s, h) => s + (r.scores[h.hole] || 0), 0);
      if (score === 0) return;
      if (bestFront9 === null || score < bestFront9.score) {
        bestFront9 = { score, dateLabel: r.dateLabel, courseName: r.courseName };
      }
    });

    // 5. Best Back 9 (hål 10-18)
    let bestBack9 = null;
    rounds.forEach(r => {
      const score = HOLES.slice(9).reduce((s, h) => s + (r.scores[h.hole] || 0), 0);
      if (score === 0) return;
      if (bestBack9 === null || score < bestBack9.score) {
        bestBack9 = { score, dateLabel: r.dateLabel, courseName: r.courseName };
      }
    });

    // 6. Most par or better in a single round
    let mostParOrBetter = null;
    rounds.forEach(r => {
      let count = 0;
      HOLES.forEach(h => {
        const s = r.scores[h.hole];
        if (s && s <= h.par) count++;
      });
      if (mostParOrBetter === null || count > mostParOrBetter.count) {
        mostParOrBetter = { count, dateLabel: r.dateLabel, courseName: r.courseName };
      }
    });

    // Helper: get ISO week key for a date
    function getISOWeek(date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
      const week1 = new Date(d.getFullYear(), 0, 4);
      return [d.getFullYear(), 1 + Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)];
    }
    function weekKey(date) {
      const [year, week] = getISOWeek(new Date(date));
      return `${year}-W${String(week).padStart(2, "0")}`;
    }

    // 7. Streak calculations
    const playedWeeks = [...new Set(rounds.map(r => weekKey(r.date)))].sort();

    // Current streak: count consecutive weeks backwards from the last played week
    let currentStreak = 0;
    if (playedWeeks.length > 0) {
      const weekSet = new Set(playedWeeks);
      // Start from the most recent played week and walk backwards
      const lastWeek = playedWeeks[playedWeeks.length - 1];
      const [lastYear, lastWeekNum] = lastWeek.split("-W").map(Number);
      let checkDate = new Date(lastYear, 0, 4); // Jan 4 is always in ISO week 1
      // Move to the start of lastWeekNum
      checkDate.setDate(checkDate.getDate() + (lastWeekNum - 1) * 7);
      // Adjust to Monday of that ISO week
      checkDate.setDate(checkDate.getDate() - ((checkDate.getDay() + 6) % 7));
      while (true) {
        const key = weekKey(checkDate);
        if (weekSet.has(key)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 7);
        } else {
          break;
        }
      }
    }

    // Longest streak: find longest consecutive run in sorted week list
    let longestStreak = 0;
    if (playedWeeks.length > 0) {
      let run = 1;
      longestStreak = 1;
      for (let i = 1; i < playedWeeks.length; i++) {
        // Check if playedWeeks[i] is exactly 1 ISO week after playedWeeks[i-1]
        const prev = playedWeeks[i - 1];
        const curr = playedWeeks[i];
        const [py, pw] = prev.split("-W").map(Number);
        // Compute next week date-based to handle year boundaries correctly
        const prevDate = new Date(py, 0, 4);
        prevDate.setDate(prevDate.getDate() + (pw - 1) * 7 - ((prevDate.getDay() + 6) % 7));
        const nextWeekDate = new Date(prevDate);
        nextWeekDate.setDate(prevDate.getDate() + 7);
        if (weekKey(nextWeekDate) === curr) {
          run++;
          if (run > longestStreak) longestStreak = run;
        } else {
          run = 1;
        }
      }
    }

    // 8. Rounds this month / this year
    const now = new Date();
    const roundsThisMonth = rounds.filter(r => {
      const d = new Date(r.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
    const roundsThisYear = rounds.filter(r => new Date(r.date).getFullYear() === now.getFullYear()).length;

    // 9. Achievements
    const totalRounds = rounds.length;

    // Has any birdie ever?
    let hasBirdie = false;
    let hasEagle = false;
    rounds.forEach(r => {
      HOLES.forEach(h => {
        const s = r.scores[h.hole];
        if (!s) return;
        if (s <= h.par - 1) hasBirdie = true;
        if (s <= h.par - 2) hasEagle = true;
      });
    });

    // Hat trick: 3+ birdies on a single round
    let hasHatTrick = false;
    rounds.forEach(r => {
      let birdies = 0;
      HOLES.forEach(h => { if (r.scores[h.hole] && r.scores[h.hole] <= h.par - 1) birdies++; });
      if (birdies >= 3) hasHatTrick = true;
    });

    // Perfect front 9: all scored holes on front 9 are par or better (all 9 must have scores)
    let hasPerfectFront = false;
    rounds.forEach(r => {
      const front = HOLES.slice(0, 9);
      const allScored = front.every(h => r.scores[h.hole]);
      if (allScored && front.every(h => r.scores[h.hole] <= h.par)) hasPerfectFront = true;
    });

    // Perfect back 9: all scored holes on back 9 are par or better (all 9 must have scores)
    let hasPerfectBack = false;
    rounds.forEach(r => {
      const back = HOLES.slice(9);
      const allScored = back.every(h => r.scores[h.hole]);
      if (allScored && back.every(h => r.scores[h.hole] <= h.par)) hasPerfectBack = true;
    });

    // Score-based achievements
    const allTotalPar18 = HOLES.reduce((s, h) => s + h.par, 0);
    let hasSub100 = false, hasSub90 = false, hasSub80 = false, hasSub72 = false;
    rounds.forEach(r => {
      if (r.totalScore > 0) {
        if (r.totalScore < 100) hasSub100 = true;
        if (r.totalScore < 90)  hasSub90  = true;
        if (r.totalScore < 80)  hasSub80  = true;
        if (r.totalScore < allTotalPar18) hasSub72 = true;
      }
    });

    // Putt achievements
    let hasGoodGreen = false;
    let hasOnePuttMaster = false;
    rounds.forEach(r => {
      const puttMap = r.putts || {};
      const holesWithPutts = HOLES.filter(h => puttMap[h.hole] > 0);
      if (holesWithPutts.length >= 9) {
        const totalPuttsRound = holesWithPutts.reduce((s, h) => s + puttMap[h.hole], 0);
        if (totalPuttsRound / holesWithPutts.length < 2.0) hasGoodGreen = true;
      }
      const onePutts = HOLES.filter(h => puttMap[h.hole] === 1).length;
      if (onePutts >= 5) hasOnePuttMaster = true;
    });

    const achievements = [
      { id: "first_round",      emoji: "🏌️", name: "Första steget",    description: "Spela 1 rond",                       unlocked: totalRounds >= 1   },
      { id: "five_rounds",      emoji: "🎯", name: "På banan",          description: "Spela 5 rundor",                     unlocked: totalRounds >= 5   },
      { id: "ten_rounds",       emoji: "🔟", name: "Tionde rundan",      description: "Spela 10 rundor",                    unlocked: totalRounds >= 10  },
      { id: "veteran",          emoji: "🏆", name: "Veteran",            description: "Spela 25 rundor",                    unlocked: totalRounds >= 25  },
      { id: "hundred_club",     emoji: "💯", name: "100-klubben",        description: "Spela 100 rundor",                   unlocked: totalRounds >= 100 },
      { id: "first_birdie",     emoji: "🐦", name: "Första birdien",     description: "Få en birdie",                       unlocked: hasBirdie          },
      { id: "eagle",            emoji: "🦅", name: "Eagle!",             description: "Få en eagle",                        unlocked: hasEagle           },
      { id: "hat_trick",        emoji: "🎳", name: "Hat trick",          description: "Få 3 birdies på en runda",           unlocked: hasHatTrick        },
      { id: "perfect_front",    emoji: "⭐", name: "Perfekt front",      description: "Alla hål på front 9 par eller bättre", unlocked: hasPerfectFront  },
      { id: "perfect_back",     emoji: "🌟", name: "Perfekt back",       description: "Alla hål på back 9 par eller bättre",  unlocked: hasPerfectBack   },
      { id: "sub100",           emoji: "📉", name: "Bryta 100",          description: "Spela en rond under 100 slag",       unlocked: hasSub100          },
      { id: "sub90",            emoji: "💪", name: "Bryta 90",           description: "Spela en rond under 90 slag",        unlocked: hasSub90           },
      { id: "sub80",            emoji: "🔥", name: "Bryta 80",           description: "Spela en rond under 80 slag",        unlocked: hasSub80           },
      { id: "scratch",          emoji: "👑", name: "Scratch",            description: "Spela en rond under par",            unlocked: hasSub72           },
      { id: "week_streak",      emoji: "📅", name: "Veckospelare",       description: "2 veckors streak",                   unlocked: longestStreak >= 2 },
      { id: "month_streak",     emoji: "🗓️", name: "Månadsrutin",        description: "4 veckors streak",                   unlocked: longestStreak >= 4 },
      { id: "dedicated",        emoji: "🔁", name: "Hängiven",           description: "8 veckors streak",                   unlocked: longestStreak >= 8 },
      { id: "good_green",       emoji: "⛳", name: "Bra på greenen",     description: "Snitt under 2.0 puttar per hål på en runda", unlocked: hasGoodGreen },
      { id: "one_putt_master",  emoji: "🎱", name: "One-putt master",    description: "5 one-putts på en runda",            unlocked: hasOnePuttMaster   },
      { id: "early_bird",       emoji: "🌅", name: "Tidig fågel",        description: "Spela 3 rundor",                     unlocked: totalRounds >= 3   },
    ].sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0));

    // 10. XP calculation
    let xpRounds = 0, xpResults = 0, xpPutts = 0;
    rounds.forEach(r => {
      // Per round: completing a round
      xpRounds += 40;
      // Score bonuses
      if (r.totalScore > 0) {
        if (r.totalScore < 80)       xpRounds += 80;
        else if (r.totalScore < 90)  xpRounds += 40;
        else if (r.totalScore < 100) xpRounds += 20;
      }
      // Per hole results
      HOLES.forEach(h => {
        const s = r.scores[h.hole];
        if (!s) return;
        if (s === 1 && h.par === 3) { xpResults += 200; return; } // HIO
        const diff = s - h.par;
        if (diff <= -2) xpResults += 60;       // eagle or better
        else if (diff === -1) xpResults += 20; // birdie
        else if (diff === 0)  xpResults += 5;  // par
        // Per putt counts
        const p = (r.putts || {})[h.hole];
        if (p === 1) xpPutts += 8;
        else if (p === 2) xpPutts += 3;
      });
    });
    const xpStreaks = longestStreak * 20;
    const xpAchievements = achievements.filter(a => a.unlocked).length * 50;
    const totalXP = xpRounds + xpResults + xpPutts + xpStreaks + xpAchievements;

    // Determine level
    let currentLevel = LEVELS[0];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVELS[i].xpRequired) { currentLevel = LEVELS[i]; break; }
    }
    const nextLevel = currentLevel.level < 10 ? LEVELS[currentLevel.level] : null;
    const xpIntoLevel = totalXP - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel ? nextLevel.xpRequired - totalXP : 0;

    records = { bestRound, mostBirdies, bestHole, bestFront9, bestBack9, mostParOrBetter, currentStreak, longestStreak, roundsThisMonth, roundsThisYear, achievements, totalXP, currentLevel, nextLevel, xpIntoLevel, xpNeededForNext, xpBreakdown: { xpRounds, xpResults, xpPutts, xpStreaks, xpAchievements } };
  }

  const handleScore = (hole, val) => setScores(prev => ({ ...prev, [hole]: val }));
  const handlePutts = (hole, val) => setPutts(prev => ({ ...prev, [hole]: val }));
  const handleReady = (hole) => {
    if (hole < 18) setTimeout(() => setActiveHole(hole + 1), 150);
    else doSaveRound(scores, putts);
  };

  const doSaveRound = (sc, pt) => {
    const roundTotal = HOLES.reduce((s, h) => s + (sc[h.hole] || 0), 0);
    const roundPutts = Object.values(pt).reduce((s, p) => s + p, 0);
    const now = new Date();
    const newRound = {
      id: Date.now(), date: now.toISOString(),
      dateLabel: now.getDate() + "/" + (now.getMonth() + 1),
      playerName, courseId, courseName: COURSE.name,
      totalScore: roundTotal, totalPutts: roundPutts,
      scores: { ...sc }, putts: { ...pt },
    };
    const updated = [...rounds, newRound];
    setRounds(updated);
    setSaveStatus("saving");
    try { window.electronAPI?.store.set("rounds", updated); setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 2500); }
    catch { setSaveStatus("error"); }
  };

  const startNewRound = () => { setScores({}); setPutts({}); setActiveHole(1); setView("scorecard"); };
  const clearHistory  = () => { setRounds([]); try { window.electronAPI?.store.delete("rounds"); } catch {} };

  const startEditRound = (round) => {
    setEditScores({ ...round.scores });
    setEditPutts({ ...round.putts });
    setEditOpenHole(null);
    setEditingRound(round.id);
  };

  const saveEditRound = () => {
    const sc = { ...editScores };
    const pt = { ...editPutts };
    const roundTotal = HOLES.reduce((s, h) => s + (sc[h.hole] || 0), 0);
    const roundPutts = Object.values(pt).reduce((s, p) => s + p, 0);
    saveRounds(rounds.map(r => r.id === editingRound ? { ...r, scores: sc, putts: pt, totalScore: roundTotal, totalPutts: roundPutts } : r));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 2500);
    setEditingRound(null);
  };

  const editRound    = rounds.find(r => r.id === editingRound);
  const editTotal    = HOLES.reduce((s, h) => s + (editScores[h.hole] || 0), 0);
  const editTotalPar = HOLES.reduce((s, h) => editScores[h.hole] ? s + h.par : s, 0);
  const editDiff     = editTotal - editTotalPar;
  const editPutTotal = Object.values(editPutts).reduce((s, p) => s + p, 0);

  return (
    <div style={{ minHeight: "100vh", background: T.bgApp, fontFamily: "system-ui, sans-serif", color: T.textSecondary, display: "flex", flexDirection: "column" }}>

      {updateMsg && (
        <div style={{ background: updateMsg.type === "downloaded" ? "#2a7d4f" : "#1a5276", color: "#fff", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 14 }}>
          <span>
            {updateMsg.type === "available" && "Ny uppdatering hittades – laddar ner…"}
            {updateMsg.type === "downloaded" && "Uppdatering nedladdad och klar att installera!"}
          </span>
          {updateMsg.type === "downloaded" && (
            <button
              onClick={() => window.electronAPI.installUpdate()}
              style={{ background: "#fff", color: "#2a7d4f", border: "none", borderRadius: 6, padding: "4px 14px", cursor: "pointer", fontWeight: 600 }}
            >
              Starta om och installera
            </button>
          )}
        </div>
      )}

      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={(round) => { const updated = [...rounds, round]; saveRounds(updated); setSaveStatus("saved"); setTimeout(() => setSaveStatus(""), 2500); }}
          courseId={courseId}
          setCourseId={setCourseId}
          courseList={allCourseList}
          coursesMap={allCoursesMap}
        />
      )}

      {showAddCourse && (
        <AddCourseModal
          onClose={() => setShowAddCourse(false)}
          onSave={(course) => {
            const updated = [...customCourses, course];
            setCustomCourses(updated);
            setCourseId(course.id);
            window.electronAPI?.store.set("customCourses", updated);
          }}
        />
      )}

      {showSettings && (
        <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 16, padding: 32, width: 440 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
              <div style={{ fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Slagbok</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.textPrimary }}>Inställningar</div>
            </div>
              <button onClick={() => setShowSettings(false)} style={{ background: "transparent", border: "none", color: T.textDim, fontSize: 20, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, color: T.textDim, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Spelarnamn</label>
              <input
                placeholder="Ditt namn (valfritt)"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", background: T.bgInput, border: "1px solid " + T.border, borderRadius: 8, color: T.textSecondary, fontSize: 14, outline: "none" }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, color: T.textDim, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Aktiv bana</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {allCourseList.map(course => (
                  <button key={course.id} onClick={() => setCourseId(course.id)} style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid " + (courseId === course.id ? T.accent : T.border), background: courseId === course.id ? T.bgActive : T.bgInput, color: courseId === course.id ? T.accent : T.textSecondary, fontSize: 13, fontWeight: courseId === course.id ? 700 : 400, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{course.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: courseId === course.id ? T.accent : T.textFaint }}>{course.subtitle}</span>
                      {course.id.startsWith("custom_") && (
                        <button
                          onClick={e => { e.stopPropagation(); const updated = customCourses.filter(c => c.id !== course.id); setCustomCourses(updated); window.electronAPI?.store.set("customCourses", updated); if (courseId === course.id) setCourseId("surahammar"); }}
                          style={{ background: "transparent", border: "none", color: T.textFaint, fontSize: 14, cursor: "pointer", lineHeight: 1, padding: "0 2px" }}
                          title="Ta bort bana"
                        >×</button>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => { setShowSettings(false); setShowAddCourse(true); }} style={{ width: "100%", padding: "10px 14px", background: "transparent", border: "1px dashed " + T.border, borderRadius: 8, color: T.textDim, fontSize: 13, cursor: "pointer", marginBottom: 8 }}>
              + Lägg till egen bana
            </button>
            <button onClick={() => setShowSettings(false)} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg, #16a34a, #4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Spara och stäng
            </button>
          </div>
        </div>
      )}

      {saveStatus && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 999, padding: "10px 24px", borderRadius: 20, pointerEvents: "none", background: saveStatus === "saved" ? "#052e16" : "#200000", border: "1px solid " + (saveStatus === "saved" ? "#4ade80" : "#ef4444"), color: saveStatus === "saved" ? "#4ade80" : "#ef4444", fontSize: 14, fontWeight: 600 }}>
          {saveStatus === "saving" ? "Sparar..." : saveStatus === "saved" ? "✓ Rond sparad!" : "⚠ Kunde inte spara"}
        </div>
      )}

      <div style={{ background: T.topbarBg, borderBottom: "1px solid " + T.topbarBorder, padding: "0 32px", display: "flex", alignItems: "center", gap: 32, height: 56, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>⛳</span>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 900, color: T.textPrimary, letterSpacing: 1 }}>Slagbok</div>
              <div style={{ fontSize: 9, color: T.textFaint, letterSpacing: 0.5 }}>v{version}</div>
            </div>
            <div style={{ fontSize: 10, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{COURSE.name}</div>
          </div>
        </div>
        <div style={{ width: 1, height: 24, background: T.border }} />
        <span style={{ fontSize: 16, color: T.textMuted }}>
          {playerName || profile.name || "Din rond"}
          {playedHoles > 0 && <span style={{ color: scoreColor, marginLeft: 8 }}>{scoreLabel}</span>}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.textPrimary, lineHeight: 1 }}>{totalScore || "-"}</div>
            <div style={{ fontSize: 10, color: T.textFaint }}>total</div>
          </div>
          {totalPutts > 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>{totalPutts}</div>
              <div style={{ fontSize: 10, color: T.textFaint }}>puttar</div>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.textDim, lineHeight: 1 }}>{playedHoles}/18</div>
            <div style={{ fontSize: 10, color: T.textFaint }}>hål</div>
          </div>
          <button onClick={() => setShowSettings(true)} title="Inställningar" style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: "1px solid " + T.border, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: T.textDim, flexShrink: 0 }}>⚙</button>
          <button onClick={() => setDarkMode(d => !d)} style={{ width: 40, height: 24, borderRadius: 12, background: darkMode ? "#1e293b" : "#d1fae5", border: "1px solid " + (darkMode ? "#334155" : "#6ee7b7"), cursor: "pointer", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", top: 2, left: darkMode ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: darkMode ? "#4ade80" : "#16a34a", transition: "left 0.25s", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
              {darkMode ? "🌙" : "☀"}
            </div>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <div style={{ width: 220, background: T.bgSecondary, borderRight: "1px solid " + T.topbarBorder, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "16px 12px" }}>
            {[["scorecard","Scorekort","📋"],["stats","Statistik","📊"],["history","Historik","🕒"],["records","Rekord","🏆"],["bag","Min Bag","🎒"]].map(tab => (
              <button key={tab[0]} onClick={() => { setView(tab[0]); setEditingRound(null); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", marginBottom: 4, background: view === tab[0] ? T.bgActive : "transparent", border: "1px solid " + (view === tab[0] ? T.borderActive : "transparent"), borderRadius: 8, color: view === tab[0] ? T.accent : T.textDim, fontSize: 13, fontWeight: view === tab[0] ? 700 : 400, cursor: "pointer", textAlign: "left" }}>
                <span>{tab[2]}</span><span>{tab[1]}</span>
              </button>
            ))}
            <div style={{ height: 1, background: T.border, margin: "8px 2px" }} />
            <button onClick={() => setShowImport(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "transparent", border: "1px dashed " + T.border, borderRadius: 8, color: T.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
              <span>↑</span><span>Importera rond</span>
            </button>
          </div>
          <div style={{ height: 1, background: T.border, margin: "0 12px" }} />
          {records && (() => {
            const lvl = records.currentLevel;
            const nxt = records.nextLevel;
            const pct = nxt
              ? Math.min(100, Math.round((records.xpIntoLevel / (nxt.xpRequired - lvl.xpRequired)) * 100))
              : 100;
            return (
              <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid " + T.border }}>
                <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 500, display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>{lvl.emoji}</span>
                  <span style={{ color: T.textDim }}>{lvl.title}</span>
                </div>
                <div style={{ height: 6, background: T.border, borderRadius: 99, overflow: "hidden", marginBottom: 5 }}>
                  <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: 99, transition: "width 0.4s ease" }} />
                </div>
                <div style={{ fontSize: 11, color: T.textDim }}>{records.totalXP.toLocaleString("sv-SE")} XP</div>
              </div>
            );
          })()}
          <div style={{ flex: 1 }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", background: T.bgApp }}>

          {view === "scorecard" && (
            <div style={{ padding: "24px 32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "36px 1fr 48px 48px 56px 56px", gap: 8, padding: "0 12px", marginBottom: 8 }}>
                {["","Hål","Resultat","Slag","Puttar",""].map((h, i) => (
                  <div key={i} style={{ fontSize: 10, color: T.textFaint, letterSpacing: 1, textTransform: "uppercase", textAlign: i >= 2 ? "center" : "left" }}>{h}</div>
                ))}
              </div>
              {[0, 1].map(section => {
                const sScore = section === 0 ? f9Score : b9Score;
                const sPar   = section === 0 ? f9Par   : b9Par;
                const sPutts = section === 0 ? f9Putts : b9Putts;
                return (
                  <div key={section} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid " + T.border, background: T.bgDeep }}>
                      <span style={{ fontSize: 11, color: T.textFaint, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{section === 0 ? "Front 9" : "Back 9"}</span>
                      <div style={{ display: "flex", gap: 16 }}>
                        {sPutts > 0 && <span style={{ fontSize: 12, color: "#60a5fa" }}>{sPutts} puttar</span>}
                        <span style={{ fontSize: 15, color: sScore ? (sScore-sPar < 0 ? "#4ade80" : sScore-sPar > 0 ? "#f87171" : "#94a3b8") : T.textFaint, fontWeight: 700 }}>
                          {sScore || "-"} <span style={{ fontSize: 11, color: T.textFaint, fontWeight: 400 }}>/ {sPar}</span>
                        </span>
                      </div>
                    </div>
                    {HOLES.slice(section * 9, section * 9 + 9).map(hole => (
                      <HoleRow key={hole.hole} holeData={hole}
                        score={scores[hole.hole] || 0} putts={putts[hole.hole] || 0}
                        onScore={val => handleScore(hole.hole, val)}
                        onPutts={val => handlePutts(hole.hole, val)}
                        onReady={() => handleReady(hole.hole)}
                        active={activeHole === hole.hole}
                        onClick={() => setActiveHole(activeHole === hole.hole ? null : hole.hole)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {view === "stats" && (
            <div style={{ padding: "24px 32px" }}>
              <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: "14px 16px", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: T.textFaint, letterSpacing: 1, textTransform: "uppercase", flexShrink: 0, minWidth: 48 }}>Bana</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => setStatsCourse("all")} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid " + (statsCourse === "all" ? T.accent : T.border), background: statsCourse === "all" ? T.bgActive : "transparent", color: statsCourse === "all" ? T.accent : T.textDim, fontSize: 12, fontWeight: statsCourse === "all" ? 700 : 400, cursor: "pointer" }}>
                      Alla banor ({rounds.length})
                    </button>
                    {allCourseList.map(course => {
                      const count = rounds.filter(r => (r.courseId || "surahammar") === course.id).length;
                      if (count === 0) return null;
                      return (
                        <button key={course.id} onClick={() => setStatsCourse(course.id)} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid " + (statsCourse === course.id ? T.accent : T.border), background: statsCourse === course.id ? T.bgActive : "transparent", color: statsCourse === course.id ? T.accent : T.textDim, fontSize: 12, fontWeight: statsCourse === course.id ? 700 : 400, cursor: "pointer" }}>
                          {course.name} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: T.textFaint, letterSpacing: 1, textTransform: "uppercase", flexShrink: 0, minWidth: 48 }}>År</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => setStatsYear("all")} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid " + (statsYear === "all" ? T.accent : T.border), background: statsYear === "all" ? T.bgActive : "transparent", color: statsYear === "all" ? T.accent : T.textDim, fontSize: 12, fontWeight: statsYear === "all" ? 700 : 400, cursor: "pointer" }}>
                      Alla år
                    </button>
                    {availableYears.map(year => {
                      const count = rounds.filter(r => new Date(r.date).getFullYear() === year).length;
                      return (
                        <button key={year} onClick={() => setStatsYear(String(year))} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid " + (statsYear === String(year) ? T.accent : T.border), background: statsYear === String(year) ? T.bgActive : "transparent", color: statsYear === String(year) ? T.accent : T.textDim, fontSize: 12, fontWeight: statsYear === String(year) ? 700 : 400, cursor: "pointer" }}>
                          {year} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
                {filteredRounds.length !== rounds.length && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid " + T.border, fontSize: 12, color: T.textFaint }}>
                    Visar {filteredRounds.length} av {rounds.length} ronder
                  </div>
                )}
              </div>

              {filteredRounds.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: T.textFaint, fontSize: 15 }}>
                  Inga ronder sparade för {statsYear === "all" ? "något år" : statsYear}
                </div>
              ) : (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: T.textPrimary }}>Resultatfördelning</div>
                      <ResultDonut dist={dist} />
                    </div>
                    <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Puttstatistik</div>
                        <button onClick={() => setPutt10(v => !v)} style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid " + (putt10 ? T.accent : T.border), background: putt10 ? T.bgActive : "transparent", color: putt10 ? T.accent : T.textDim, fontSize: 11, fontWeight: putt10 ? 700 : 400, cursor: "pointer" }}>
                          10 senaste
                        </button>
                      </div>
                      {(() => {
                        const pr = putt10 ? last10Rounds : filteredRounds;
                        const pv = pr.flatMap(r => Object.values(r.putts || {})).filter(p => p > 0);
                        const hwp = pv.length;
                        const atp = pv.reduce((s,p)=>s+p,0);
                        const ap  = hwp > 0 ? (atp/hwp).toFixed(1) : "-";
                        const apr = pr.length > 0 ? (pr.reduce((s,r)=>s+Object.values(r.putts||{}).reduce((a,p)=>a+p,0),0)/pr.length).toFixed(1) : "-";
                        const p1 = pv.filter(p=>p===1).length;
                        const p2 = pv.filter(p=>p===2).length;
                        const p3 = pv.filter(p=>p>=3).length;
                        return (
                          <div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                              {[["Snitt/rond", apr, "#60a5fa"],["Snitt/hål", ap, "#818cf8"],["Reg. hål", hwp, "#94a3b8"]].map(item => (
                                <div key={item[0]} style={{ background: T.bgBlueMid, border: "1px solid " + T.border, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                                  <div style={{ fontSize: 22, fontWeight: 900, color: item[2] }}>{item[1]}</div>
                                  <div style={{ fontSize: 11, color: T.textDim, marginTop: 4 }}>{item[0]}</div>
                                </div>
                              ))}
                            </div>
                            <StatBar label="1 putt"    count={p1} color="#4ade80" pct={hwp > 0 ? (p1/hwp)*100 : 0} />
                            <StatBar label="2 puttar"  count={p2} color="#60a5fa" pct={hwp > 0 ? (p2/hwp)*100 : 0} />
                            <StatBar label="3+ puttar" count={p3} color="#f87171" pct={hwp > 0 ? (p3/hwp)*100 : 0} />
                            {putt10 && <div style={{ fontSize: 11, color: T.textFaint, marginTop: 10, textAlign: "right" }}>Baserat på {pr.length} ronder</div>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24, marginBottom: 16 }}>
                    {(() => {
                      const gr = gir10 ? last10Rounds : filteredRounds;
                      let gh = 0, gt = 0;
                      gr.forEach(r => HOLES.forEach(h => {
                        const s = r.scores[h.hole], p = (r.putts||{})[h.hole];
                        if (s && p) { gt++; if (s - p <= h.par - 2) gh++; }
                      }));
                      const gp = gt > 0 ? Math.round(gh / gt * 100) : null;
                      return (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Greens in Regulation (GIR)</div>
                              <div style={{ fontSize: 12, color: T.textFaint, marginTop: 4 }}>Andel hål där du nått green på rätt antal slag</div>
                              <button onClick={() => setGir10(v => !v)} style={{ marginTop: 10, padding: "4px 14px", borderRadius: 20, border: "1px solid " + (gir10 ? T.accent : T.border), background: gir10 ? T.bgActive : "transparent", color: gir10 ? T.accent : T.textDim, fontSize: 11, fontWeight: gir10 ? 700 : 400, cursor: "pointer" }}>
                                {gir10 ? "10 senaste ✓" : "10 senaste"}
                              </button>
                            </div>
                            <div style={{ textAlign: "center", flexShrink: 0 }}>
                              <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, color: gp !== null ? (gp >= 50 ? "#4ade80" : gp >= 30 ? "#fb923c" : "#f87171") : T.textGhost }}>
                                {gp !== null ? gp + "%" : "-"}
                              </div>
                              <div style={{ fontSize: 11, color: T.textFaint, marginTop: 4 }}>{gh} av {gt} hål</div>
                              {gir10 && <div style={{ fontSize: 10, color: T.accent, marginTop: 2 }}>{gr.length} ronder</div>}
                            </div>
                          </div>
                          {gt > 0 && (
                            <div>
                              <div style={{ height: 10, background: T.border, borderRadius: 6, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: (gp||0) + "%", background: (gp||0) >= 50 ? "linear-gradient(90deg,#16a34a,#4ade80)" : (gp||0) >= 30 ? "linear-gradient(90deg,#ea580c,#fb923c)" : "linear-gradient(90deg,#dc2626,#f87171)", borderRadius: 6, transition: "width 0.5s ease" }} />
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                <span style={{ fontSize: 11, color: T.textFaint }}>0%</span>
                                <span style={{ fontSize: 11, color: "#4ade80" }}>Tour-snitt ~65%</span>
                                <span style={{ fontSize: 11, color: T.textFaint }}>100%</span>
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
                                {[3, 4, 5].map(par => {
                                  let h = 0, t = 0;
                                  gr.forEach(r => HOLES.filter(x => x.par === par).forEach(hole => {
                                    const s = r.scores[hole.hole], p = (r.putts||{})[hole.hole];
                                    if (s && p) { t++; if (s - p <= par - 2) h++; }
                                  }));
                                  const pct = t > 0 ? Math.round(h/t*100) + "%" : "-";
                                  const color = par===3?"#94a3b8":par===4?"#60a5fa":"#a78bfa";
                                  return (
                                    <div key={par} style={{ background: T.bgSidebarBtn, border: "1px solid " + T.border, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                                      <div style={{ fontSize: 20, fontWeight: 900, color }}>{pct}</div>
                                      <div style={{ fontSize: 11, color: T.textFaint, marginTop: 4 }}>Par {par}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {gt === 0 && (
                            <div style={{ textAlign: "center", padding: "16px 0", color: T.textFaint, fontSize: 13 }}>GIR kräver att både slag och puttar är registrerade per hål</div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Score-historik</div>
                        <button onClick={() => setHist10(v => !v)} style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid " + (hist10 ? T.accent : T.border), background: hist10 ? T.bgActive : "transparent", color: hist10 ? T.accent : T.textDim, fontSize: 11, fontWeight: hist10 ? 700 : 400, cursor: "pointer" }}>10 senaste</button>
                      </div>
                      {(() => {
                        const hr = hist10 ? last10Rounds : filteredRounds;
                        return (
                          <div>
                            <div style={{ fontSize: 12, color: T.textFaint, marginBottom: 16 }}>{hr.length} ronder</div>
                            <HistoryChart rounds={hr} />
                            {hr.length > 0 && (
                              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                                {[["Bästa", Math.min(...hr.map(r=>r.totalScore)), "#4ade80"],["Snitt", (hr.reduce((s,r)=>s+r.totalScore,0)/hr.length).toFixed(1), "#94a3b8"],["Senaste", hr[hr.length-1].totalScore, "#60a5fa"]].map(item => (
                                  <div key={item[0]} style={{ flex: 1, textAlign: "center", background: T.bgSidebarBtn, border: "1px solid " + T.border, borderRadius: 10, padding: "10px 8px" }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: item[2] }}>{item[1]}</div>
                                    <div style={{ fontSize: 11, color: T.textDim }}>{item[0]}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                    <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Front / Back</div>
                        <div style={{ fontSize: 11, color: T.textFaint }}>Snitt per rond · {filteredRounds.length} ronder</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", gap: 4, marginBottom: 8 }}>
                        {["","Slag","Par","Puttar"].map((h, i) => (
                          <div key={i} style={{ fontSize: 11, color: T.textFaint, textAlign: i === 0 ? "left" : "center", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                        ))}
                      </div>
                      {[["Front 9", allF9Score || "-", allF9Par, allF9Putts || "-"],["Back 9", allB9Score || "-", allB9Par, allB9Putts || "-"],["Totalt", allTotalScore || "-", allTotalPar, allRoundsPutts || "-"]].map((row, i) => (
                        <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", gap: 4, padding: "12px 0", borderTop: "1px solid " + (i === 2 ? T.borderStrong : T.border) }}>
                          <span style={{ color: i === 2 ? T.textPrimary : T.textMuted, fontSize: 15, fontWeight: i === 2 ? 700 : 400 }}>{row[0]}</span>
                          <span style={{ textAlign: "center", fontSize: i === 2 ? 22 : 18, fontWeight: 700, color: typeof row[1] === "number" ? (row[1]-row[2] < 0 ? "#4ade80" : row[1]-row[2] > 0 ? "#f87171" : "#94a3b8") : T.textGhost }}>{row[1]}</span>
                          <span style={{ textAlign: "center", fontSize: 14, color: T.textDim }}>{row[2]}</span>
                          <span style={{ textAlign: "center", fontSize: 16, color: typeof row[3] === "number" && row[3] > 0 ? "#60a5fa" : T.textGhost }}>{row[3]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>Snitt per hål</div>
                      <button onClick={() => setAvg10(v => !v)} style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid " + (avg10 ? T.accent : T.border), background: avg10 ? T.bgActive : "transparent", color: avg10 ? T.accent : T.textDim, fontSize: 11, fontWeight: avg10 ? 700 : 400, cursor: "pointer" }}>10 senaste</button>
                    </div>
                    <div style={{ fontSize: 12, color: T.textFaint, marginBottom: 16 }}>
                      {avg10 ? "Baserat på " + last10Rounds.length + " senaste ronder" : "Beräknat över alla sparade ronder"}
                    </div>
                    <HoleAvgTable rounds={avg10 ? last10Rounds : filteredRounds} />
                  </div>
                </div>
              )}
            </div>
          )}


          {view === "history" && (
            <div style={{ padding: "24px 32px" }}>
              {editingRound !== null ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <button onClick={() => setEditingRound(null)} style={{ padding: "8px 16px", background: "transparent", border: "1px solid " + T.border, borderRadius: 8, color: T.textDim, fontSize: 13, cursor: "pointer" }}>← Tillbaka</button>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: T.textPrimary }}>Redigerar: {editRound?.dateLabel}{editRound?.playerName ? " — " + editRound.playerName : ""}</div>
                      <div style={{ fontSize: 12, color: T.textFaint }}>Klicka på ett hål för att ändra slag och puttar</div>
                    </div>
                    <button onClick={saveEditRound} style={{ marginLeft: "auto", padding: "10px 28px", background: "linear-gradient(135deg,#16a34a,#4ade80)", border: "none", borderRadius: 10, color: "#030712", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Spara ändringar</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
                    {[["Total score", editTotal || "-", (editDiff > 0 ? "+" : "") + (editDiff !== 0 ? editDiff : "E") + " mot par", editDiff < 0 ? "#4ade80" : editDiff > 0 ? "#f87171" : "#94a3b8"],["Puttar", editPutTotal || "-", "", "#60a5fa"],["Datum", editRound?.dateLabel, "", T.textMuted],editRound?.playerName ? ["Spelare", editRound.playerName, "", T.textMuted] : null].filter(Boolean).map(kpi => (
                      <div key={kpi[0]} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: "14px 18px" }}>
                        <div style={{ fontSize: 11, color: T.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{kpi[0]}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: kpi[3] }}>{kpi[1]}</div>
                        {kpi[2] && <div style={{ fontSize: 12, color: T.textFaint }}>{kpi[2]}</div>}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[0, 1].map(section => (
                      <div key={section} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ padding: "10px 16px", background: T.bgDeep, borderBottom: "1px solid " + T.border }}>
                          <span style={{ fontSize: 11, color: T.textFaint, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{section === 0 ? "Front 9" : "Back 9"}</span>
                        </div>
                        {HOLES.slice(section * 9, section * 9 + 9).map(hole => (
                          <EditHoleRow key={hole.hole} holeData={hole}
                            score={editScores[hole.hole] || 0}
                            putts={editPutts[hole.hole] || 0}
                            onScore={val => setEditScores(prev => ({ ...prev, [hole.hole]: val }))}
                            onPutts={val => setEditPutts(prev => ({ ...prev, [hole.hole]: val }))}
                            open={editOpenHole === hole.hole}
                            onToggle={() => setEditOpenHole(editOpenHole === hole.hole ? null : hole.hole)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: T.textPrimary }}>Sparade ronder</div>
                      <div style={{ fontSize: 13, color: T.textFaint, marginTop: 2 }}>{rounds.length} ronder totalt</div>
                    </div>
                    <button onClick={() => setShowImport(true)} style={{ padding: "10px 22px", background: "transparent", border: "1px solid " + T.borderActive, borderRadius: 10, color: T.accent, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      ↑ Importera från Min Golf
                    </button>
                  </div>
                  {rounds.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                      <div style={{ color: T.textFaint, fontSize: 15 }}>Inga sparade ronder ännu</div>
                      <div style={{ color: T.textGhost, fontSize: 13, marginTop: 8 }}>Spela en rond eller importera från Min Golf</div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[...rounds].reverse().map(round => {
                        const diff = round.totalScore - 72;
                        const diffColor = diff < 0 ? "#4ade80" : diff > 0 ? "#f87171" : "#94a3b8";
                        const diffLabel = diff > 0 ? "+" + diff : diff < 0 ? String(diff) : "E";
                        return (
                          <div key={round.id} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ flex: 1 }}>
                              {round.playerName && <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary }}>{round.playerName}</div>}
                              {round.courseName && <div style={{ fontSize: 11, color: T.accent, fontWeight: 600, marginTop: round.playerName ? 2 : 0 }}>{round.courseName}</div>}
                              <div style={{ fontSize: 12, color: T.textDim, marginTop: 2 }}>{new Date(round.date).toLocaleDateString("sv-SE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                            </div>
                            <div style={{ textAlign: "center", width: 64 }}>
                              <div style={{ fontSize: 28, fontWeight: 900, color: diffColor }}>{diffLabel}</div>
                              <div style={{ fontSize: 10, color: T.textDim }}>mot par</div>
                            </div>
                            <div style={{ textAlign: "center", width: 64 }}>
                              <div style={{ fontSize: 28, fontWeight: 900, color: T.textPrimary }}>{round.totalScore}</div>
                              <div style={{ fontSize: 10, color: T.textDim }}>slag</div>
                            </div>
                            <div style={{ textAlign: "center", width: 64 }}>
                              <div style={{ fontSize: 28, fontWeight: 900, color: round.totalPutts > 0 ? "#60a5fa" : T.textFaint }}>{round.totalPutts > 0 ? round.totalPutts : "-"}</div>
                              <div style={{ fontSize: 10, color: T.textDim }}>puttar</div>
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                              <button onClick={() => startEditRound(round)} style={{ padding: "8px 18px", background: "transparent", border: "1px solid " + T.borderActive, borderRadius: 8, color: T.accent, fontSize: 13, cursor: "pointer" }}>Redigera</button>
                              <DeleteRoundButton onDelete={() => saveRounds(rounds.filter(r => r.id !== round.id))} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {view === "records" && (
            <RecordsView records={records} T={T} darkMode={darkMode} />
          )}

          {view === "bag" && (
            <BagView
              profile={profile}   onProfileChange={setProfile}
              bag={bag}           onBagChange={setBag}
              goals={goals}       onGoalsChange={setGoals}
              rounds={rounds}     allCourseList={allCourseList}
            />
          )}

        </div>
      </div>
      <div style={{ textAlign: "center", padding: "8px 0", fontSize: 10, color: T.textGhost, letterSpacing: 1, userSelect: "none" }}>
        Slagbok · Skapad av Oscar Widmark
      </div>
    </div>
  );
}