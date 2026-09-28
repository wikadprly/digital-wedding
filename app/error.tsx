"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ivory px-6 text-center">
      <Image
        src="/images/foto%20pria.JPG"
        alt=""
        width={96}
        height={96}
        className="h-20 w-20 rounded-full object-cover opacity-80"
      />
      <h1 className="mt-6 font-serif text-2xl text-burgundy">
        Ada yang Tidak Beres
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-brown-mute">
        Undangan gagal dimuat. Silakan coba lagi atau muat ulang halaman.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-burgundy/90"
      >
        Coba Lagi
      </button>
    </main>
  );
}
