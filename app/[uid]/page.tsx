import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n";
import InvitationView from "@/features/invitation/invitation-view";
import staticConfig from "@/config/config";

type PageProps = {
  params: Promise<{ uid: string }>;
};

export function generateStaticParams() {
  return [{ uid: staticConfig.data.uid }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uid } = await params;

  if (uid !== staticConfig.data.uid) {
    notFound();
  }

  const data = staticConfig.data;
  const title = `${data.groomName} & ${data.brideName} — ${data.title}`;
  const description = data.description;

  return {
    title,
    description,
    alternates: { canonical: `/${uid}` },
    openGraph: {
      title,
      description,
      url: `/${uid}`,
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

export default async function InvitationPage({ params }: PageProps) {
  const { uid } = await params;

  if (uid !== staticConfig.data.uid) {
    notFound();
  }

  return (
    <LanguageProvider language="id">
      <InvitationView uid={uid} />
    </LanguageProvider>
  );
}