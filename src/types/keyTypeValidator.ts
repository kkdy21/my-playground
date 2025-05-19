export function createKeyValidator<T extends Readonly<Record<string, unknown>>>(
  constantObject: T
) {
  return (key: string): key is Extract<keyof T, string> =>
    key in constantObject;
}
