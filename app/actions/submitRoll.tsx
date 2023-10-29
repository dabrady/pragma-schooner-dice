'use server'

import { DICE_KEY, SCORE_FUNCTIONS } from '@/app/constants';
import { Category, ScoreCard } from '@/app/types';

export default async function submitRoll(
  previousState,
  formData: FormData,
) {
  var diceRoll = formData.getAll(DICE_KEY).map(Number);

  return {
    diceRoll,
    scoreCard: topCategories(diceRoll),
  };
}

function topCategories(diceRoll: int[]): ScoreCard {
  var fullScoreCard = allScores(diceRoll);

  // Find the highest-scoring categories for the given dice roll.
  var topCategoryNames = Object.keys(fullScoreCard).reduce(
    function findBest(bestCategories, category) {
      var score = fullScoreCard[category];
      var bestScore = fullScoreCard[bestCategories[0]] || 0;

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

  // Build a scorecard of only the top categories.
  return topCategoryNames.reduce(
    function buildFinalScoreCard(scoreCard, category) {
      scoreCard[category] = fullScoreCard[category];
      return scoreCard;
    }, {} as ScoreCard
  );
}

function allScores(diceRoll: int[]): ScoreCard {
  // TODO(dabrady) Determine qualifying subset to iterate over.
  return Object.keys(SCORE_FUNCTIONS).reduce(
    function buildScoreCard(scoreCard, category) {
      scoreCard[category] = SCORE_FUNCTIONS[category](diceRoll);
      return scoreCard;
    },
    {} as ScoreCard
  );
}
