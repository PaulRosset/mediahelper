export type CDMName = "widevine" | "playready" | "fairplay" | "default";

export function getCDMNameFromKeySystem(keySystem: string): CDMName {
  switch (true) {
    case keySystem.includes("widevine"):
      return "widevine";
    case keySystem.includes("playready"):
      return "playready";
    case keySystem.includes("apple"):
      return "fairplay";
    default:
      return "default";
  }
}
