import { it } from "vitest";

type CaseRecord<P> = Record<string, P>;
type CaseArray<P> = ReadonlyArray<P & { name: string }>;

// jest-in-case lets individual cases set `skip: true` or `only: true` to
// override the runner. The flags are read here and passed through to the
// handler as part of the params.
interface CaseControlFlags {
  readonly skip?: boolean;
  readonly only?: boolean;
}

export default function cases<P>(
  description: string,
  handler: (params: P) => void | Promise<void>,
  testCases: CaseRecord<P> | CaseArray<P>
): void {
  const entries: Array<readonly [string, P & CaseControlFlags]> = Array.isArray(
    testCases
  )
    ? testCases.map(({ name, ...rest }) => [
        name,
        rest as unknown as P & CaseControlFlags,
      ])
    : (Object.entries(testCases) as Array<
        readonly [string, P & CaseControlFlags]
      >);

  for (const [name, params] of entries) {
    const runner = params.skip ? it.skip : params.only ? it.only : it;
    runner(`${description} > ${name}`, () => handler(params));
  }
}
