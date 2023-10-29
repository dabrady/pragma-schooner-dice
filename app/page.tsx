'use client'

import Image from 'next/image';
import { useFormState } from 'react-dom';

import {
  DICE_KEY,
  NUM_DICE,
  Category,
} from '@/app/constants';
import _submitRoll from '@/app/actions/submitRoll';
import styles from './page.module.css';

const initialState: {
  diceRoll: int[];
  categories: { [key: Category]: int };
} = {
  diceRoll: [] as int[],
  categories: {} as { [key: Category]: int },
};

export default function Home() {
  var [judgment, submitRoll] = useFormState(_submitRoll, initialState);

  return (
    <main className={styles.main}>
      <form className={styles.diceForm} action={submitRoll}>
        <h1>Dice</h1>
        <div>
          {new Array(NUM_DICE).fill().map((_, index) => (
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
          <div className={styles.description}>
            <h1>Judgment</h1>
            <p>{judgment.categories.toString()}</p>
          </div>
        )
       : null}
    </main>
  );
}
