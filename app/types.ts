export enum Category {
  ONES = 'ONES',
  TWOS = 'TWOS',
  THREES = 'THREES',
  FOURS = 'FOURS',
  FIVES = 'FIVES',
  SIXES = 'SIXES',
  SEVENS = 'SEVENS',
  EIGHTS = 'EIGHTS',

  THREE_OF_A_KIND = 'THREE_OF_A_KIND',
  FOUR_OF_A_KIND = 'FOUR_OF_A_KIND',

  FULL_HOUSE = 'FULL_HOUSE',
  SMALL_STRAIGHT = 'SMALL_STRAIGHT',
  ALL_DIFFERENT = 'ALL_DIFFERENT',
  LARGE_STRAIGHT = 'LARGE_STRAIGHT',
  SCHOONER = 'SCHOONER',
  CHANCE = 'CHANCE',
}

export type Judgment = {
  diceRoll: number[];
  scoreCard: Category[];
};
