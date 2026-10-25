"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { ENGAGEMENT_MODELS } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function EngagementTabs() {
  const [selectedId, setSelectedId] = useState(ENGAGEMENT_MODELS[0].id);
  const activeModel =
    ENGAGEMENT_MODELS.find((m) => m.id === selectedId) || ENGAGEMENT_MODELS[0];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Horizontal Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-ink-soft border border-white/10 mb-10">
        {ENGAGEMENT_MODELS.map((model) => {
          const isSelected = model.id === selectedId;

          return (
            <button
              key={model.id}
              type="button"
              onClick={() => setSelectedId(model.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                isSelected ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-brand-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {model.title}
                {model.badge && (
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                    ★
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Crossfade Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModel.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="p-8 md:p-12 rounded-[24px] bg-ink-soft border border-white/10 shadow-2xl relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide">
              {activeModel.title}
            </h3>
            {activeModel.badge && (
              <Badge variant="orange">{activeModel.badge}</Badge>
            )}
          </div>

          <p className="font-body text-base md:text-lg text-paper/90 mb-4 leading-relaxed">
            {activeModel.description}
          </p>

          <p className="text-xs font-mono text-brand-orange uppercase tracking-wider mb-8">
            Ideal For: {activeModel.idealFor}
          </p>

          {/* Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 border-t border-white/10 pt-6">
            {activeModel.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-muted">
                <Check className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Quote Button */}
          <Button href="/contact" size="md" withRocketIcon>
            Get a Quote
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
