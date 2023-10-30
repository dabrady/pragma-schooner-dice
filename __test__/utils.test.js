import { describe, expect, it, jest, test } from '@jest/globals';

import { Category } from '@/app/types';
import {
  score,
  topCategories,
} from '@/app/utils';

import { toBeEquivalent } from './customMatchers';

const when = describe;
const { todo } = it;

/**
 * NOTE(dabrady) These tests are not exhaustive, with respect to all the edge cases
 * and varying top categories for dice rolls that have the same patterns but different
 * sums.
 *
 * I have written just enough to be illustrative.
 */
describe('game utilities', () => {
  describe('score', () => {
    describe('ONES', () => {
      it("sums all 1's", () => {
        expect(score(Category.ONES, [1,2,1,3,1])).toEqual(3);
      });
    });

    describe('TWOS', () => {
      it("sums all 2's", () => {
        expect(score(Category.TWOS, [1,2,1,2,1])).toEqual(4);
      });
    });

    describe('THREES', () => {
      it("sums all 3's", () => {
        expect(score(Category.THREES, [1,3,3,2,1])).toEqual(6);
      });
    });

    describe('FOURS', () => {
      it("sums all 4's", () => {
        expect(score(Category.FOURS, [1,4,3,2,1])).toEqual(4);
      });
    });

    describe('FIVES', () => {
      it("sums all 5's", () => {
        expect(score(Category.FIVES, [5,4,5,5,1])).toEqual(15);
      });
    });

    describe('SIXES', () => {
      it("sums all 6's", () => {
        expect(score(Category.SIXES, [6,6,3,6,6])).toEqual(24);
      });
    });

    describe('SEVENS', () => {
      it("sums all 7's", () => {
        expect(score(Category.SEVENS, [6,6,7,6,7])).toEqual(14);
      });
    });

    describe('EIGHTS', () => {
      it("sums all 8's", () => {
        expect(score(Category.EIGHTS, [8,8,7,6,7])).toEqual(16);
      });
    });

    describe('THREE_OF_A_KIND', () => {
      it("sums all values", () => {
        expect(score(Category.THREE_OF_A_KIND, [2,3,4,1,1])).toEqual(11);
      });
    });

    describe('FOUR_OF_A_KIND', () => {
      it("sums all values", () => {
        expect(score(Category.FOUR_OF_A_KIND, [2,3,4,1,1])).toEqual(11);
      });
    });

    describe('FULL_HOUSE', () => {
      it("valued at 25", () => {
        expect(score(Category.FULL_HOUSE, [1,1,1,1,1])).toEqual(25);
      });
    });

    describe('SMALL_STRAIGHT', () => {
      it("valued at 30", () => {
        expect(score(Category.SMALL_STRAIGHT, [1,1,1,1,1])).toEqual(30);
      });
    });

    describe('ALL_DIFFERENT', () => {
      it("valued at 35", () => {
        expect(score(Category.ALL_DIFFERENT, [1,1,1,1,1])).toEqual(35);
      });
    });

    describe('LARGE_STRAIGHT', () => {
      it("valued at 40", () => {
        expect(score(Category.LARGE_STRAIGHT, [1,1,1,1,1])).toEqual(40);
      });
    });

    describe('SCHOONER', () => {
      it("valued at 50", () => {
        expect(score(Category.SCHOONER, [1,1,1,1,1])).toEqual(50);
      });
    });

    describe('CHANCE', () => {
      it("sums all values", () => {
        expect(score(Category.CHANCE, [1,2,3,4,5])).toEqual(15);
      });
    });
  });

  describe('topCategories', () => {
    when('all dice are the same', () => {
      it('is SCHOONER', () => {
        expect(topCategories([8,8,8,8,8])).toBeEquivalent([
          Category.SCHOONER,
        ]);
      });
    });

    when('all dice are in sequence', () => {
      it('is LARGE_STRAIGHT', () => {
        expect(topCategories([4,5,6,7,8])).toBeEquivalent([
          Category.LARGE_STRAIGHT,
        ]);
      });
    });

    when('all dice are different', () => {
      when('and in sequence', () => {
        it('is LARGE_STRAIGHT', () => {
          expect(topCategories([1,2,3,4,5])).toBeEquivalent([
            Category.LARGE_STRAIGHT,
          ]);
        });
      });

      it('is ALL_DIFFERENT', () => {
        expect(topCategories([1,2,3,4,6])).toBeEquivalent([
          Category.ALL_DIFFERENT,
        ]);
      });
    });

    todo('four dice are in sequence');

    todo('three of a kind plus a pair');

    when('four dice are the same', () => {
      it('are FOUR_OF_A_KIND, THREE_OF_A_KIND, and CHANCE', () => {
        expect(topCategories([1,2,2,2,2])).toBeEquivalent([
          Category.FOUR_OF_A_KIND,
          Category.THREE_OF_A_KIND,
          Category.CHANCE,
        ]);
      });
    });

    when('three dice are the same', () => {
      it('are THREE_OF_A_KIND and CHANCE', () => {
        expect(topCategories([1,2,2,2,3])).toBeEquivalent([
          Category.THREE_OF_A_KIND,
          Category.CHANCE,
        ]);
      });
    });

    when('nothing special', () => {
      it('is CHANCE', () => {
        var aFewBasicRolls = [
          [1,2,3,5,5],
          [2,3,4,6,6],
          [3,4,5,8,8],
        ];
        for (let roll of aFewBasicRolls) {
          expect(topCategories(roll)).toBeEquivalent([Category.CHANCE]);
        }
      });
    });
  });
});
