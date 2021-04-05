export function getWidevineSecurityLevel(
  robustnesses: string[]
): "L1" | "L2" | "L3" {
  let hasHardwareDecode = false;
  let hasHardwareDecrypt = false;
  for (let i = 0, len = robustnesses.length; i < len; i += 1) {
    const robustness = robustnesses[i];
    if (robustness === "HW_SECURE_ALL") {
      hasHardwareDecode = true;
      hasHardwareDecrypt = true;
      break;
    } else if (robustness === "HW_SECURE_DECODE") {
      hasHardwareDecode = true;
    } else if (robustness === "HW_SECURE_CRYPTO") {
      hasHardwareDecrypt = true;
    }
  }

  if (hasHardwareDecrypt) {
    return hasHardwareDecode ? "L1" : "L2";
  }
  return "L3";
}
