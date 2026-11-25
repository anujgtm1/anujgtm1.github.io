export function assertNever(value: never, context = "Unhandled discriminated union value"): never {
  throw new Error(`${context}: ${String(value)}`)
}
