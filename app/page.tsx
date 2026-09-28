import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import InvitationView from "@/features/invitation/invitation-view";
import staticConfig from "@/config/config";

export async function generateMetadata(): Promise<Metadata> {
  const data = staticConfig.data;
  const title = `${data.groomName} & ${data.brideName} — ${data.title}`;
  const description = data.description;

  return {
    title,
    description,
    alternates: { canonical: `/${data.uid}` },
    openGraph: {
      title,
      description,
      url: `/${data.uid}`,
      siteName: data.title,
      type: "website",
      ...(data.ogImage ? { images: [data.ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(data.ogImage ? { images: [data.ogImage] } : {}),
    },
  };
}

export default function Home() {
  return (
    <LanguageProvider language="id">
      <InvitationView uid={staticConfig.data.uid} />
    </LanguageProvider>
  );
}
