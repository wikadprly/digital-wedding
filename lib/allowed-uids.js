import config from "@/config/config";

const allowedUids = new Set([config.data.uid]);

export function isAllowedUid(uid) {
  return typeof uid === "string" && allowedUids.has(uid);
}