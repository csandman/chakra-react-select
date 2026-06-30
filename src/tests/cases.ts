import { test } from "vitest";

type CaseRecord<P> = Record<string, P>;
type CaseArray<P> = readonly (P & { name: string })[];

// jest-in-case lets individual cases set `skip: true` or `only: true` to
// override the runner. The flags are read here and passed through to the
// handler as part of the params.
interface CaseControlFlags {
  readonly skip?: boolean;
  readonly only?: boolean;
}

const pickRunner = ({ skip, only }: CaseControlFlags) => {
  if (skip) {
    return test.skip;
  }
  if (only) {
    return test.only;
  }
  return test;
};

const cases = <P>(
  description: string,
  handler: (params: P) => void | Promise<void>,
  testCases: CaseRecord<P> | CaseArray<P>
): void => {
  const entries: (readonly [string, P & CaseControlFlags])[] = Array.isArray(
    testCases
  )
    ? testCases.map(({ name, ...rest }) => [
        name,
        rest as unknown as P & CaseControlFlags,
      ])
    : (Object.entries(testCases) as (readonly [
        string,
        P & CaseControlFlags,
      ])[]);

  for (const [name, params] of entries) {
    const runner = pickRunner(params);
    runner(`${description} > ${name}`, () => handler(params));
  }
};

export default cases;
