import { isEqual } from 'lodash';
import { expect } from '@jest/globals';

export function toBeEquivalent(actual, expected) {
  return {
    pass: isEqual(new Set(actual), new Set(expected)),
    message: () => (
      `expected ${this.utils.printReceived(
          actual,
        )} to contain the same elements as ${this.utils.printExpected(
          expected,
        )}`
    )
  };
}

expect.extend({
  toBeEquivalent,
});
