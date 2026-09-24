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
      <Profile />
      <LoveStory />
      <section className="relative mx-auto w-full max-w-[430px] overflow-hidden">
        {/* komposisi P4 — P4header di atas, P4-P5isi cover mengisi sisa */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          <Image
            src="/wayang/p4header.png"
            alt=""
            width={1080}
            height={1080}
            priority
            className="h-[40vh] w-full object-cover object-top"
          />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src="/wayang/p4-p5isi.png"
              alt=""
              width={1080}
              height={1920}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <Events />
      </section>
      <section className="relative mx-auto w-full max-w-[430px] overflow-hidden">
        {/* komposisi P5 — P5header band atas, P4-P5isi mengisi tengah, P5footer band bawah */}
        <div className="pointer-events-none absolute inset-0 flex flex-col">
          <Image
            src="/wayang/p5header.png"
            alt=""
            width={1080}
            height={1153}
            priority
            className="h-[30vh] w-full object-cover object-top"
          />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src="/wayang/p4-p5isi.png"
              alt=""
              width={1080}
              height={1920}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <Image
            src="/wayang/p5footer.png"
            alt=""
            width={1080}
            height={1920}
            priority
            className="h-[30vh] w-full object-cover object-bottom"
          />
        </div>

        <Gallery />
      </section>
      <Gifts />
      <Wishes />
      <Closing />
    </main>
  );
}
