"use client";

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
      <section>
        <Events />
      </section>
      <section>
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
