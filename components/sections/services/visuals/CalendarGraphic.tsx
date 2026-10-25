"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, Sparkles, TrendingUp } from "lucide-react";

export function CalendarGraphic() {
  const prefersReducedMotion = useReducedMotion();

  const scheduleDays = [
    {
      day: "MON",
      date: "12",
      title: "Reel 01: Hook & Pacing",
      type: "Reels",
      status: "Published",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      active: false,
    },
    {
      day: "TUE",
      date: "13",
      title: "Carousel: Brand Identity",
      type: "Design",
      status: "Scheduled",
      statusColor: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
      active: true,
    },
    {
      day: "WED",
      date: "14",
      title: "Podcast Cut: Ep. 12",
      type: "Long-form",
      status: "In Review",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      active: false,
    },
    {
      day: "THU",
      date: "15",
      title: "Story Assets & Teasers",
      type: "Social",
      status: "Scheduled",
      statusColor: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
      active: false,
    },
    {
      day: "FRI",
      date: "16",
      title: "Monthly Strategy Review",
      type: "Growth",
      status: "Completed",
      statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      active: false,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] select-none">
      {/* Soft orange glow behind calendar */}
      <div className="absolute -inset-4 bg-brand-orange/15 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-2xl bg-gradient-to-br from-ink-soft to-ink p-5 border border-white/10 shadow-2xl">
        {/* Calendar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-brand-orange/30">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display uppercase text-sm tracking-wide text-white">
                Content Pipeline
              </h4>
              <p className="text-[10px] font-mono text-white/50">Weekly Publishing Schedule</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Retainer
          </div>
        </div>

        {/* Schedule list */}
        <div className="mt-4 space-y-2">
          {scheduleDays.map((item, idx) => (
            <motion.div
              key={item.day}
              animate={
                item.active && !prefersReducedMotion
                  ? { scale: [1, 1.015, 1], borderColor: ["rgba(224, 74, 0, 0.3)", "rgba(224, 74, 0, 0.7)", "rgba(224, 74, 0, 0.3)"] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                item.active
                  ? "bg-brand-orange/[0.08] border-brand-orange/40"
                  : "bg-white/[0.02] border-white/5 hover:border-white/15"
              }`}
            >
              {/* Day & Date badge */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] font-mono text-white/50 leading-none">{item.day}</span>
                  <span className="text-xs font-bold font-display text-white mt-0.5 leading-none">
                    {item.date}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/90 line-clamp-1">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-white/50">
                    <span>{item.type}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-white/40" /> 10:00 AM
                    </span>
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div
                className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${item.statusColor}`}
              >
                {item.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Metrics Card */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-1.5 font-medium text-brand-orange">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">100% On-Time Execution</span>
          </div>
          <span className="text-[10px] font-mono text-white/40">Guaranteed SLA</span>
        </div>
      </div>
    </div>
  );
}
