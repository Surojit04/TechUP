"use client";

import React, { useState } from "react";
import { MessageCircle, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { SITE_URL } from "@/lib/site";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const postUrl = `${SITE_URL}/blog/${slug}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title} - ${postUrl}`
  )}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl
  )}`;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-mono uppercase tracking-widest text-muted">
        SHARE ARTICLE:
      </span>
      <div className="flex items-center gap-2">
        {/* WhatsApp */}
        <a
          href={waShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="p-2.5 rounded-full bg-ink-soft border border-white/10 text-paper hover:text-[#25D366] hover:border-[#25D366] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="p-2.5 rounded-full bg-ink-soft border border-white/10 text-paper hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Copy link */}
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="Copy article link"
          className="p-2.5 rounded-full bg-ink-soft border border-white/10 text-paper hover:text-brand-orange hover:border-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          {copied ? (
            <Check className="w-4 h-4 text-brand-orange" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      {copied && (
        <span className="text-[11px] font-mono text-brand-orange animate-fade-in">
          Link copied!
        </span>
      )}
    </div>
  );
}
