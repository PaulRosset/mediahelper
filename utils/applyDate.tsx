export function applyDate(): string {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;
}
