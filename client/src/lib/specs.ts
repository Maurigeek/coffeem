export function cleanSpecs(
  obj: Record<string, string | undefined>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => typeof v === 'string')
  ) as Record<string, string>;
}
