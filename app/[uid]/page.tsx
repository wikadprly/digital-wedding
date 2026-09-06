import { LanguageProvider } from "@/lib/i18n";
import InvitationView from "@/features/invitation/invitation-view";

type PageProps = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<{ to?: string; guest?: string }>;
};

export default async function InvitationPage({ params, searchParams }: PageProps) {
  const { uid } = await params;
  await searchParams;

  return (
    <LanguageProvider language="id">
      <InvitationView uid={uid} />
    </LanguageProvider>
  );
}
