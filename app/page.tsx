import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <form className={styles.diceForm}>
        <label>Dice</label>
        <div>
          <input type="number" min="1" max="8"/>
          <input type="number" min="1" max="8"/>
          <input type="number" min="1" max="8"/>
          <input type="number" min="1" max="8"/>
          <input type="number" min="1" max="8"/>
        </div>
        <button type="submit">SCORE</button>
      </form>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
}
