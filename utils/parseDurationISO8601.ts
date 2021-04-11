const iso8601Duration = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;

function isNonEmptyString(x: unknown): x is Exclude<string, ""> {
  return typeof x === "string" && x.length > 0;
}

export function parseDurationISO8601(val: string): number | null {
  if (!isNonEmptyString(val)) {
    return null;
  }

  const match = iso8601Duration.exec(val) as RegExpExecArray;
  if (match === null) {
    return null;
  }

  const duration =
    parseFloat(isNonEmptyString(match[2]) ? match[2] : "0") *
      365 *
      24 *
      60 *
      60 +
    parseFloat(isNonEmptyString(match[4]) ? match[4] : "0") *
      30 *
      24 *
      60 *
      60 +
    parseFloat(isNonEmptyString(match[6]) ? match[6] : "0") * 24 * 60 * 60 +
    parseFloat(isNonEmptyString(match[8]) ? match[8] : "0") * 60 * 60 +
    parseFloat(isNonEmptyString(match[10]) ? match[10] : "0") * 60 +
    parseFloat(isNonEmptyString(match[12]) ? match[12] : "0");
  return duration;
}
