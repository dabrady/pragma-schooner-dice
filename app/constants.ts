import { Category, ScoreCard } from '@/app/types';

export const DICE_KEY = 'dice';
export const NUM_DICE = 5;

/**
 * Returns a function that, given a dice roll, sums all values equal to a
 * given target value.
 *
 * If no target value is given, the returned function simply sums all values.
 */
function sumOfAll(targetValue?: int) {
  return function score(diceRoll: int[]) {
    return diceRoll
      .filter(v => v == (targetValue ?? v))
      .reduce((sum, v) => sum + v, 0);
  };
}

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
  [Category.FULL_HOUSE]: function score(_) { return 25; },
  [Category.SMALL_STRAIGHT]: function score(_) { return 30; },
  [Category.ALL_DIFFERENT]: function score(_) { return 35; },
  [Category.LARGE_STRAIGHT]: function score(_) { return 40; },
  [Category.SCHOONER]: function score(_) { return 50; },

  [Category.CHANCE]: function score(diceRoll: int[]) {
    return diceRoll.reduce((sum, v) => sum + v, 0);
  }
}
