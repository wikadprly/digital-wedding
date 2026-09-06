import { LanguageProvider } from "@/lib/i18n";
import RootView from "@/features/invitation/root-view";

export default function Home() {
  return (
    <LanguageProvider language="id">
      <RootView />
    </LanguageProvider>
  );
}
