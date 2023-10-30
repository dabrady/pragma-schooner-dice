import {
  countBy,
  every,
  find,
  slice,
  sortBy,
  uniq,
} from 'lodash';
import { Category } from '@/app/types';
import { atLeast, hasFrequency, sumOfAll } from '@/app/utils';

export const DICE_KEY = 'dice';
export const NUM_DICE = 5;

/* A convenience predicate that evaluates to true. */
const YES = function qualifies(diceRoll: number[]): boolean { return true; };

// NOTE(dabrady) Because we are guaranted the number of dice, we can simplify
// some of our qualifiers using precomputed test values and regular expressions.
export const CATEGORY_QUALIFIERS = {
  /* These categories apply to any given dice roll. */
  [Category.ONES]: YES,
  [Category.TWOS]: YES,
  [Category.THREES]: YES,
  [Category.FOURS]: YES,
  [Category.FIVES]: YES,
  [Category.SIXES]: YES,
  [Category.SEVENS]: YES,
  [Category.EIGHTS]: YES,
  [Category.CHANCE]: YES,

  /* At least three dice are the same. */
  [Category.THREE_OF_A_KIND]: function qualifies(diceRoll: number[]): boolean {
    return hasFrequency(diceRoll, atLeast(3));
  },

  /* At least four dice are the same. */
  [Category.FOUR_OF_A_KIND]: function qualifies(diceRoll: number[]): boolean {
    return hasFrequency(diceRoll, atLeast(4));
  },

  /* Three of a kind plus a pair. */
  [Category.FULL_HOUSE]: function qualifies(diceRoll: number[]): boolean {
    var threeOfKind = hasFrequency(diceRoll, 3);
    var twoOfAnother = hasFrequency(diceRoll, 2);
    return (threeOfKind && twoOfAnother);
  },

  /* Four sequential dice. */
  [Category.SMALL_STRAIGHT]: function qualifies(diceRoll: number[]): boolean {
    const SMALL_STRAIGHTS = /1234|2345|3456|5678/;
    return SMALL_STRAIGHTS.test(sortBy(uniq(diceRoll)).join(''));
  },

  /* No duplicate dice. */
  [Category.ALL_DIFFERENT]: function qualifies(diceRoll: number[]): boolean {
    // If the deduped list is the same size as the original, they're all different.
    return uniq(diceRoll).length == diceRoll.length;
  },

  /* All sequential dice. */
  [Category.LARGE_STRAIGHT]: function qualifies(diceRoll: number[]): boolean {
    const LARGE_STRAIGHTS = /12345|23456|34567|45678/;
    return LARGE_STRAIGHTS.test(sortBy(uniq(diceRoll)).join(''));
  },

  /* All dice are the same. */
  [Category.SCHOONER]: function qualifies(diceRoll: number[]): boolean {
    // Compare every value against the first one: if any are different, fail.
    return every(diceRoll, (value) => value == diceRoll[0]);
  },
};

export const SCORE_FUNCTIONS = {
  [Category.ONES]: sumOfAll(1),
  [Category.TWOS]: sumOfAll(2),
  [Category.THREES]: sumOfAll(3),
  [Category.FOURS]: sumOfAll(4),
  [Category.FIVES]: sumOfAll(5),
  [Category.SIXES]: sumOfAll(6),
  [Category.SEVENS]: sumOfAll(7),
  [Category.EIGHTS]: sumOfAll(8),

  [Category.THREE_OF_A_KIND]: sumOfAll(),
  [Category.FOUR_OF_A_KIND]: sumOfAll(),
  [Category.CHANCE]: sumOfAll(),

  [Category.FULL_HOUSE]: function score(_: number[]): number { return 25; },
  [Category.SMALL_STRAIGHT]: function score(_: number[]): number { return 30; },
  [Category.ALL_DIFFERENT]: function score(_: number[]): number { return 35; },
  [Category.LARGE_STRAIGHT]: function score(_: number[]): number { return 40; },
  [Category.SCHOONER]: function score(_: number[]): number { return 50; },
};
