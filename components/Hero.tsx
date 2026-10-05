"use client";

import { m } from "motion/react";
import SipVsFdCalculator from "./SipVsFdCalculator";
import AnimatedCounter from "./ui/animated-counter";
import Ticker from "./Ticker";
import MarketStrip from "./MarketStrip";
import { FermorAssetHeader } from "./FermorAssetHeader";
import { FermorHotTopics } from "./FermorHotTopics";
import TiltCard from "./TiltCard";
import BlurFade from "./BlurFade";
import PhoneMockup from "./PhoneMockup";
import SpendDonut from "./SpendDonut";
import { Button } from "./ui/button";
import FlipFadeText from "./ui/flip-fade-text";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import HeroBackdrop from "./HeroBackdrop";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 spotlight" />
      <HeroBackdrop />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-10 md:py-24 min-w-0">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] items-start min-w-0"
        >
          <div>
            <Badge>For India - Free Forever</Badge>
            <h1 className="font-serif text-[40px] leading-[1.05] tracking-tight mt-4 md:text-[72px] md:leading-[1.02]">
              Your money, finally{" "}
              <FlipFadeText
                words={["legible.", "planned.", "invested."]}
                interval={2600}
                letterDuration={0.5}
              />
            </h1>
            <p className="text-lg text-muted mt-6 max-w-xl">
              SIP, tax, spend. Plain numbers for India.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#calculators">Explore calculators</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#forecast">See forecast</a>
              </Button>
            </div>
            <Card className="mt-10 min-w-0 overflow-hidden">
              <CardContent className="pt-6 flex flex-col min-[500px]:flex-row items-center gap-4 min-w-0">
                <PhoneMockup />
                <div className="min-w-0 w-full flex-1 overflow-hidden">
                  <CardTitle className="text-lg break-words">One place for it all.</CardTitle>
                  <CardDescription className="mt-1 font-mono tabular-nums break-words">
                    HDFC +1.56% · SBI +0.82% · Maruti -1.06%
                  </CardDescription>
                  <div className="mt-3 min-w-0">
                    <SpendDonut />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 min-w-0">
              <div className="min-w-0 overflow-hidden">
                <p className="font-mono text-lg sm:text-2xl tabular-nums break-words">
                  <AnimatedCounter value={158} suffix="+" separator="," grouping="indian" duration={0.9} />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1 break-words">calculators</p>
              </div>
              <div className="border-l border-border pl-2 sm:pl-4 min-w-0 overflow-hidden">
                <p className="font-mono text-lg sm:text-2xl tabular-nums break-words">Rs 0</p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1 break-words">forever</p>
              </div>
              <div className="border-l border-border pl-2 sm:pl-4 min-w-0 overflow-hidden">
                <p className="font-serif text-lg sm:text-2xl break-words">India</p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1 break-words">built for</p>
              </div>
            </div>
          </div>
          <TiltCard>
            <SipVsFdCalculator />
          </TiltCard>
        </m.div>
      </div>
      <Ticker />
      <div className="border-t border-border bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-2 flex flex-wrap items-center gap-3 min-w-0">
          <span aria-hidden="true" className="inline-block size-3 shrink-0 bg-primary ledger-marker-pulse" />
          <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight tabular-nums break-words min-w-0">MARKET LIVE</h2>
          <span className="font-mono text-xs tabular-nums text-muted border border-border px-2 py-1 min-h-[44px] inline-flex items-center whitespace-nowrap">STREAMING NOW</span>
        </div>
        <p className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-2 text-sm text-muted break-words">Live Indian stocks - prices update in real time below.</p>
      </div>
      <MarketStrip />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-8 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] items-start min-w-0">
        <FermorAssetHeader />
        <FermorHotTopics />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 min-w-0">
        <BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-0">
            <Card className="min-w-0 overflow-hidden"><CardContent className="pt-6"><p className="text-xs uppercase tracking-wider text-muted">Goals</p><p className="font-serif text-3xl mt-2 break-words tabular-nums">Rs 1.64Cr</p><p className="text-sm text-muted mt-1 break-words">10y · 12% · Rs 25k/mo</p></CardContent></Card>
            <Card className="min-w-0 overflow-hidden"><CardContent className="pt-6"><p className="text-xs uppercase tracking-wider text-muted">Spend</p><p className="font-serif text-3xl mt-2 break-words tabular-nums">Rs 48,320</p><p className="text-sm text-muted mt-1 break-words">-12% vs last month</p></CardContent></Card>
            <Card className="min-w-0 overflow-hidden"><CardContent className="pt-6"><p className="text-xs uppercase tracking-wider text-muted">Growth</p><p className="font-serif text-3xl mt-2 text-primary break-words tabular-nums">+211%</p><p className="text-sm text-muted mt-1 break-words">Rs 53L → Rs 1.64Cr</p></CardContent></Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
