import { LanguageProvider } from "@/lib/i18n";
import InvitationView from "@/features/invitation/invitation-view";
import staticConfig from "@/config/config";

export default function Home() {
  return (
    <LanguageProvider language="id">
      <InvitationView uid={staticConfig.data.uid} />
    </LanguageProvider>
  );
}