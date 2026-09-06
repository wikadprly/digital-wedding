import { useInvitation } from "./use-invitation";
import staticConfig from "@/config/config";

export function useConfig() {
  const { config } = useInvitation();
  return config || staticConfig.data;
}
