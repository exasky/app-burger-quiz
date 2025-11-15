import styles from './Counter.module.scss';

interface CounterProps {
  team: 'mayo' | 'ketchup';
  points: number;
}

export function Counter(props: CounterProps) {
  return (
    <div className={styles['point-container']}>
      <div className={`${styles['point']} ${styles[props.team == 'mayo' ? 'mayo' : 'ketchup']}`}>
        {Math.floor(props.points / 10)}
      </div>
      <div className={`${styles['point']} ${styles[props.team == 'mayo' ? 'mayo' : 'ketchup']}`}>
        {props.points % 10}
      </div>
    </div>
  );
}
