"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { WorkItem, WorkCategory } from "@/content/work";

interface ProjectModalProps {
  item: WorkItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function getServiceParam(cat: WorkCategory): string {
  switch (cat) {
    case "reels":
    case "long-form":
      return "Content & Video";
    case "branding":
    case "thumbnails":
      return "Branding & Design";
    case "websites":
      return "Web & Digital Presence";
    default:
      return "Content & Video";
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function ProjectModal({
  item,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isEnded, setIsEnded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsEnded(false);
    onNext();
  };

  const handlePrev = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsEnded(false);
    onPrev();
  };

  // Play video upon modal mount / item change if item has video
  useEffect(() => {
    if (!item?.video) return;

    setIsEnded(false);
    setCurrentTime(0);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser autoplay policy blocks unmuted video, fallback to muted
            videoEl.muted = true;
            setIsMuted(true);
            videoEl
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    }

    return () => {
      if (videoEl) {
        videoEl.pause();
      }
    };
  }, [item?.id, item?.video]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        if ((e.target as HTMLElement)?.tagName === "INPUT") return;
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        if ((e.target as HTMLElement)?.tagName === "INPUT") return;
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " && (e.target as HTMLElement) === modalRef.current) {
        // Spacebar toggles play/pause if focusing modal
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onNext, onPrev]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isEnded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsEnded(false);
      setIsPlaying(true);
    } else if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsEnded(false);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      if (isEnded && newTime < duration) {
        setIsEnded(false);
      }
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.85);
      videoRef.current.volume = 0.85;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else if (newVol === 0 && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleToggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  if (!item || !mounted) return null;

  const content = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Dimmed backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
          className="relative z-10 w-full max-w-4xl bg-ink-soft border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto max-h-[92vh] focus:outline-none"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Media Column */}
          <div className="relative md:w-1/2 bg-black flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[380px] p-6 border-b md:border-b-0 md:border-r border-white/10">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-brand-orange/10 blur-3xl pointer-events-none" />

            {/* Media Presentation */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              {item.category === "reels" ? (
                item.video ? (
                  // Real Reel Video Player in 9:16 Smartphone Frame
                  <div className="relative w-52 sm:w-60 md:w-64 max-h-[62vh] sm:max-h-[70vh] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-brand-orange/40 shadow-2xl bg-black flex flex-col justify-between group/reel select-none">
                    {/* HTML5 Native Video Element */}
                    <video
                      ref={videoRef}
                      src={encodeURI(item.video)}
                      poster={item.poster}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={handleVideoEnded}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={handleTogglePlay}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    />

                    {/* Gradient shading for controls readability */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />

                    {/* Reel Header */}
                    <div className="relative z-20 p-3 flex items-center justify-between text-[11px] text-white/90 font-mono">
                      <span className="px-2 py-0.5 rounded bg-brand-orange text-white font-bold tracking-wide">
                        REEL PREVIEW
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-white/80 tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Center Overlay Play/Replay Button */}
                    <div className="relative z-20 flex flex-col items-center justify-center my-auto pointer-events-none">
                      {isEnded ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReplay();
                          }}
                          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gradient text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg shadow-brand-orange/50 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          aria-label="Replay video"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Replay Video</span>
                        </button>
                      ) : !isPlaying ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTogglePlay();
                          }}
                          className="pointer-events-auto w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-xl shadow-brand-orange/50 hover:scale-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          aria-label="Play video"
                        >
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </button>
                      ) : null}
                    </div>

                    {/* Bottom Accessible Controls Bar */}
                    <div className="relative z-20 p-3 flex flex-col gap-2 bg-black/60 backdrop-blur-md border-t border-white/15">
                      {/* Seek Progress Bar */}
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={duration || 100}
                          step={0.1}
                          value={currentTime}
                          onChange={handleSeek}
                          aria-label="Seek video position"
                          aria-valuemin={0}
                          aria-valuemax={duration || 100}
                          aria-valuenow={currentTime}
                          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          style={{
                            background: `linear-gradient(to right, #ff4d00 ${
                              duration ? (currentTime / duration) * 100 : 0
                            }%, rgba(255, 255, 255, 0.25) ${
                              duration ? (currentTime / duration) * 100 : 0
                            }%)`,
                          }}
                        />
                      </div>

                      {/* Control Buttons Row */}
                      <div className="flex items-center justify-between text-white/90">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/* Play / Pause Toggle Button */}
                          <button
                            type="button"
                            onClick={handleTogglePlay}
                            className="p-1 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                            aria-label={isPlaying ? "Pause video" : isEnded ? "Replay video" : "Play video"}
                          >
                            {isEnded ? (
                              <RotateCcw className="w-4 h-4 text-brand-orange" />
                            ) : isPlaying ? (
                              <Pause className="w-4 h-4 fill-white" />
                            ) : (
                              <Play className="w-4 h-4 fill-white translate-x-0.5" />
                            )}
                          </button>

                          {/* Volume / Mute Toggle Button */}
                          <button
                            type="button"
                            onClick={handleToggleMute}
                            className="p-1 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-4 h-4 text-white/70" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-brand-orange" />
                            )}
                          </button>

                          {/* Volume Slider */}
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            aria-label="Volume level"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
                            className="w-12 sm:w-14 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-brand-orange focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange"
                            style={{
                              background: `linear-gradient(to right, #ff4d00 ${
                                (isMuted ? 0 : volume) * 100
                              }%, rgba(255, 255, 255, 0.25) ${(isMuted ? 0 : volume) * 100}%)`,
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-semibold text-brand-amber">
                            {isMuted ? "MUTED" : `${Math.round(volume * 100)}%`}
                          </span>
                          <button
                            type="button"
                            onClick={handleToggleFullscreen}
                            aria-label="Toggle fullscreen"
                            className="p-1 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Reel 9:16 Smartphone Mockup for cards without video
                  <div className="relative w-52 sm:w-60 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-brand-orange/40 shadow-2xl bg-black flex flex-col justify-between">
                    <img
                      src={item.poster}
                      alt={item.title}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                    {/* Reel Header */}
                    <div className="relative z-10 p-3 flex items-center justify-between text-[10px] text-white/80 font-mono">
                      <span className="px-2 py-0.5 rounded bg-brand-orange text-white font-bold">
                        REEL PREVIEW
                      </span>
                      <span>9:16 HD</span>
                    </div>

                    {/* Center Play/Pause button */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                      <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-brand-orange/40">
                        <Play className="w-6 h-6 fill-white translate-x-0.5" />
                      </div>
                      <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-white/70">
                        Creative Portfolio Reel
                      </span>
                    </div>

                    {/* Audio Controls Simulation */}
                    <div className="relative z-10 p-3 border-t border-white/15 flex items-center justify-between text-white/80 bg-black/40 backdrop-blur-sm">
                      <div className="p-1.5 rounded-full bg-white/10 text-white/60">
                        <Volume2 className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div className="flex items-center gap-1">
                        {[8, 18, 12, 22, 14, 20, 10, 16].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full bg-brand-orange"
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-brand-amber font-semibold">
                        9:16 VERTICAL
                      </span>
                    </div>
                  </div>
                )
              ) : (
                // 16:9 or 1:1 Showcase Frame with Real Graphic
                <div
                  className={cn(
                    "relative w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black",
                    item.aspectRatio === "1/1"
                      ? "aspect-square max-w-[280px] sm:max-w-[320px]"
                      : "aspect-video"
                  )}
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/15 text-white">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Previous & Next Floating Buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right / Information Column */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Client */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <Badge variant="orange" size="sm">
                  {item.categoryLabel}
                </Badge>
                <span className="font-mono text-xs uppercase text-white/50">
                  Client: {item.client}
                </span>
              </div>

              {/* Title */}
              <h3
                id="project-modal-title"
                className="font-display uppercase text-2xl sm:text-3xl text-white tracking-wide mb-4 leading-tight"
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Result Pill if available */}
              {item.result && (
                <div className="p-3 rounded-xl bg-brand-orange/10 border border-brand-orange/30 mb-6 flex items-center gap-2 text-xs font-mono text-brand-amber">
                  <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Result: {item.result}</span>
                </div>
              )}

              {/* Tools Used */}
              {item.toolsUsed && item.toolsUsed.length > 0 && (
                <div className="mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">
                    Tools & Stack Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action: Request a Quote */}
            <div className="pt-6 border-t border-white/10">
              <Link
                href={`/contact?service=${encodeURIComponent(getServiceParam(item.category))}`}
                onClick={onClose}
              >
                <Button variant="primary" size="lg" className="w-full">
                  <span>Want something like this? Get a Quote</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
