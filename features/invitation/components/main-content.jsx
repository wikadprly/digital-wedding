"use client";

import Image from "next/image";
import Hero from "./hero";
import Profile from "@/features/profile/components/profile";
import LoveStory from "@/features/lovestory/components/love-story";
import Events from "@/features/events/components/events";
import Gallery from "@/features/gallery/components/gallery";
import Gifts from "@/features/gifts/components/gifts";
import Wishes from "@/features/wishes/components/wishes";
import Closing from "@/features/closing/components/closing";

export default function MainContent() {
  return (
    <main>
      <Hero />
      <section>
        <Profile />
      </section>
      <section>
        <LoveStory />
      </section>
      <section className="relative mx-auto w-full max-w-[430px]">
        {/* komposisi P4+P5 — SATU LAPISAN membentang penuh: isiatasP4 di atas, isiP4-P5 cover di tengah (crop atas/bawah), isibawahP4 di bawah */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          <Image
            src="/latarbelakang/isiatasP4.png"
            alt=""
            width={1080}
            height={1920}
            priority
            unoptimized
            className="h-auto w-full"
          />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
src="/latarbelakang/isiP4-P5.png"
            alt=""
            width={1080}
            height={1920}
            priority
            unoptimized
            className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <Image
            src="/latarbelakang/isibawahP4.png"
            alt=""
            width={1080}
            height={1920}
            priority
            unoptimized
            className="h-auto w-full"
          />
        </div>

        <Events />
        <Gallery />
      </section>
      <section>
        <Gifts />
      </section>
      <section>
        <Wishes />
      </section>
      <section>
        <Closing />
      </section>
    </main>
  );
}
