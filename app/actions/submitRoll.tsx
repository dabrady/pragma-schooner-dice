'use server'

import { DICE_KEY } from '@/app/constants';
import { Judgment } from '@/app/types';
import { topCategories } from '@/app/utils';

export default async function submitRoll(
  previousState: Judgment,
  formData: FormData,
): Promise<Judgment> {
  var diceRoll = formData.getAll(DICE_KEY).map(Number);

  return {
    diceRoll,
    scoreCard: topCategories(diceRoll),
  };
}
