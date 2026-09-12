import type { Metadata } from "next";
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
    return { title: "Undangan Tidak Ditemukan" };
  }

  const data = staticConfig.data;
  const title = `${data.groomName} & ${data.brideName} — ${data.title}`;

  return {
    title,
    description: data.description,
    openGraph: {
      title,
      description: data.description,
      ...(data.ogImage ? { images: [data.ogImage] } : {}),
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { uid } = await params;

  return (
    <LanguageProvider language="id">
      <InvitationView uid={uid} />
    </LanguageProvider>
  );
}