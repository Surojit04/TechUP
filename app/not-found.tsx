import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-ink text-paper">
      {/* Floating Rocket Graphic */}
      <div className="w-24 h-24 rounded-3xl bg-ink-soft border border-brand-orange/40 text-brand-orange flex items-center justify-center mb-8 shadow-brand-glow animate-bounce [animation-duration:3s]">
        <Rocket className="w-12 h-12" />
      </div>

      <h1 className="font-display uppercase text-8xl sm:text-9xl tracking-widest text-brand-orange mb-2">
        404
      </h1>

      <h2 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-wide mb-4">
        THIS PAGE TOOK OFF WITHOUT US
      </h2>

      <p className="font-body text-base text-muted max-w-md mx-auto mb-10 leading-relaxed">
        The coordinates you entered don&apos;t exist or have moved to another sector. Let&apos;s get you back on track.
      </p>

      <Button href="/" size="lg" withRocketIcon>
        Return to Home
      </Button>
    </div>
  );
}
