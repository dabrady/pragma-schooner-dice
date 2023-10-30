import {
  countBy,
  find,
  lte,
  keys,
  partial,
  pickBy,
  sum,
} from 'lodash';

import { CATEGORY_QUALIFIERS, SCORE_FUNCTIONS } from '@/app/constants';
import { Category } from '@/app/types';

/**
 * Returns a function that, given a dice roll, sums all values equal to a
 * given target value.
 *
 * If no target value is given, the returned function simply sums all values.
 */
export function sumOfAll(targetValue?: number): (diceRoll: number[]) => number {
  return function score(diceRoll: number[]) {
    return sum(diceRoll.filter(v => v == (targetValue ?? v)))
  };
}

/** A simple helper that generates a predicate for checking if one number is at least another. */
export function atLeast(value: number): (value: number) => boolean {
  return partial(lte, value);
}

/**
 * Determines if any single value occurs a given number of times in a given dice
 * roll.
 */
export function hasFrequency(diceRoll: number[], target: number | ((v: number) => number)): boolean {
  // Build a frequency map, then check if any value has the target frequency.
  return !!find(countBy(diceRoll), (freq) => (
    typeof target == 'function' ? target(freq) : freq == target
  ));
}

/** Calculates the score of the given dice roll in the given category. */
export function score(category: Category, diceRoll: number[]): number {
  return SCORE_FUNCTIONS[category](diceRoll);
}

/**
 * Returns the categories which match the given dice roll, based on the result
 * of their qualifying predicate function.
 */
export function qualifyingCategories(diceRoll: number[]): Category[] {
  function matches(diceRoll: number[]) {
    return function matchesDiceRoll(predicateFn: (diceRoll: number[]) => boolean) {
      return predicateFn(diceRoll);
    }
  }

  return keys(pickBy(CATEGORY_QUALIFIERS, matches(diceRoll))) as Category[];
}

/**
 * Returns the best scoring category for the given roll (or all which tie for bes t).
 */
export function topCategories(diceRoll: number[]): Category[] {
  var fullScoreCard: { [key in Category]?: number } = allRelevantScores(diceRoll);

  // Find the highest-scoring categories for the given dice roll.
  return (
    keys(fullScoreCard) as Category[]
  ).reduce<Category[]>(
    function findBest(bestCategories: Category[], category: Category) {
      var score: number = fullScoreCard[category]!;
      var bestScore: number = fullScoreCard[bestCategories[0]] || 0;

      // If it's a clear winner, replace the previous best.
      if (score > bestScore) {
        return [category];
      }
      // If it ties with the previous best, take note of it.
      if (score == bestScore) {
        return [...bestCategories, category];
      }
      // Otherwise move along.
      return bestCategories;
    }, []
  );

  /**********/

  /** Returns a summary of how well a dice roll scores in qualifying categories. */
  function allRelevantScores(diceRoll: number[]): { [key in Category]?: number } {
    return qualifyingCategories(diceRoll).reduce(
      function buildScoreCard(scoreCard, category) {
        scoreCard[category] = score(category, diceRoll);
        return scoreCard;
      }, {} as { [key in Category]?: number }
    );
  }
}
