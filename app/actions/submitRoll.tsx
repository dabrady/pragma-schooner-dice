'use server'

import { DICE_KEY } from '@/app/constants';

export default async function submitRoll(
  previousState,
  formData: FormData,
) {
  var diceRoll = formData.getAll(DICE_KEY);

  return {
    diceRoll,
    categories: [],
  };
}
