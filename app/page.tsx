'use client'

import Image from 'next/image';
import { useFormState } from 'react-dom';

import { DICE_KEY, NUM_DICE } from '@/app/constants';
import { Category, Judgment } from '@/app/types';
import _submitRoll from '@/app/actions/submitRoll';
import styles from './page.module.css';

const initialState: Judgment  = {
  diceRoll: [] as number[],
  scoreCard: {} as { [key in Category]?: number },
};

export default function Home() {
  var [judgment, submitRoll] = useFormState(_submitRoll, initialState);

  return (
    <main className={styles.main}>
      <form className={styles.diceForm} action={submitRoll}>
        <h1>Dice</h1>
        <div>
          {new Array(NUM_DICE).fill(0).map((_, index) => (
            <input
              key={index}
              name={DICE_KEY}
              type="number"
              min="1"
              max="8"
              required
            />
          ))}
        </div>
        <button type="submit">JUDGE</button>
      </form>
      {judgment.diceRoll.length
        ? (
          <div className={styles.judgment}>
            <h1>Score Card</h1>
            <p>
              <pre>{JSON.stringify(judgment.scoreCard, null, 2)}</pre>
            </p>
          </div>
        )
       : null}
    </main>
  );
}
